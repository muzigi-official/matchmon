# MatchMon 백엔드 API 연동 가이드 (사람용 요약)

> 이 문서는 **사람이 읽고 빠르게 파악하는 용도**의 요약본이다.
> 에이전트(Kiro)가 참조하는 **기준 전문**은 `.kiro/steering/api-contract.md`에 있다.
> 두 문서가 다르면 `.kiro/steering/api-contract.md`(현행 As-Is 계약 전문)를 정본으로 본다.
>
> - 계약 출처: 사용자 제공 `MatchMon Backend API Contract (현행 / As-Is)` — 백엔드 소스 직접 확인 기준
> - 작성 기준일: 2026-10-14
> - 성격: **현행(As-Is)** 구현 기준. 재설계안(Redesign)이 아님.

---

## 1. 기본 정보

| 항목 | 값 |
|---|---|
| Base URL | `http://localhost:3000` |
| Swagger | `GET /api` |
| 인증 | `Authorization: Bearer <access_token>` (전역 가드, `@Public` 제외) |
| CORS | 전체 허용 |
| 핵심 설계 | **Match(일정/정보)와 MatchResult(결과)가 분리**, GoalRecord(득점)는 또 별도 |

### 공통 에러 응답
```json
{ "success": false, "statusCode": 400, "message": "문자열 또는 string[]",
  "error": "Bad Request", "timestamp": "...", "path": "/request-path" }
```

### Enum
- 승패 `EMatchResult`: `HOME_WIN` | `AWAY_WIN` | `DRAW`
- 상태 `EMatchResultState`: `COMPLETED` | `PENDING_RESULT` | `WAITING`

---

## 2. 엔드포인트 한눈에 보기

> 상세 DTO/응답 필드는 `.kiro/steering/api-contract.md` 참고. 여기서는 경로·메서드·인증만.

### Auth `/auth`
| 메서드·경로 | 인증 |
|---|---|
| `POST /auth/signUp` | Public |
| `POST /auth/signIn` | Public |
| `GET /auth/profile` | Bearer |

### Competitions `/competitions`
| 메서드·경로 | 인증 |
|---|---|
| `POST /competitions/create` | Bearer |
| `GET /competitions/get/:id` | Public |
| `GET /competitions/list?page=1` | Public |
| `PATCH /competitions/:id` | Bearer |
| `DELETE /competitions/:id` | Bearer |
| `POST /competitions/apply` | Bearer |

- 페이지 응답 `meta`는 **snake_case** `last_page` 주의.

### Participants `/competitions/:id/participants`
| 메서드·경로 | 인증 |
|---|---|
| `PATCH .../addPlayers` (Query `jwtUser`) | Bearer |
| `PATCH .../removePlayer` (Query `jwtUser`) | Bearer |
| `GET .../list?competitionId=` | Public |
| `GET .../players?participantId=` | Public |
| `GET .../relatedTeam?participantId=` | Public |

- 참가 생성/삭제 전용 엔드포인트는 **없음**(선수 추가/제거는 PATCH).

### Stages `/competitions/:id/stages` ⚠️ 3개 컨트롤러 공유 (충돌 주의)
- GroupStages: `GET .../competition/:competitionId`, `POST .../`, `POST .../add-team`, `DELETE .../:id`, `DELETE .../:groupId/remove-team/:teamId`
- Tournaments: `POST .../create`(Query `jwtUser`), `GET .../get?groupKey=`, `GET .../list?competitionId=`
- TournamentRounds: `GET .../`, `GET .../:id`, `POST .../`, `PUT .../:id`, `DELETE .../:id`
- ⚠️ `POST /stages`, `GET /stages/:id`, `DELETE /stages/:id` 중복 정의 → 등록 순서 의존, **연동 전 검증 필수**.

### Matches `/competitions/:id/matches` ⚠️ 3개 컨트롤러 공유 (충돌 주의)
- Match(일정): `POST .../group-stage`, `POST .../tournament`, `GET .../`, `GET .../:id`, `PUT .../:id`, `DELETE .../:id`
- MatchResult(결과): `POST .../`, `PUT .../:id`, `GET .../:matchId`, `GET .../competition/:competitionId/results`, `GET .../:matchId/result`
- Goals(득점, RecordsController): `POST .../create`, `POST .../remove`, `GET .../list?matchId=` (**Public**), `DELETE .../:id`
- ⚠️ `GET .../:id`(Match)와 `GET .../:matchId`(결과)가 동일 패턴 → **가로채기 가능**, 연동 전 검증 필수.

### Standings `/competitions/:id/standings?groupLabel=`  ⚠️ `:id`는 **tournamentId**
### Scorers `/competitions/:id/scorers`  ⚠️ `:id`는 **tournamentId**
### Stats `/competitions/:id/stats`  — 미구현 스텁(echo만)
### SSE `/realtime/tournaments/:id/events`  — `:id`는 tournamentId, 이벤트: `match.updated` / `standings.updated` / `topscorers.updated`
### Match Settings `/match-settings`  — POST / GET / GET :id / PUT :id / DELETE :id (모두 Bearer)

---

## 3. 연동 시 반드시 알아야 할 함정 (요약)

1. `competitions/:id/matches`와 `competitions/:id/stages`는 **여러 컨트롤러가 베이스를 공유** → 라우트 충돌. 호출 전 실제 동작 검증.
2. **standings / scorers / SSE의 `:id`는 competitionId가 아니라 tournamentId.**
3. **점수 이중 저장**: Match와 MatchResult가 각각 점수를 가짐.
4. **결과 중복 생성 위험**: MatchResult↔Match 유니크 제약 없음, 재입력 시 중복 가능.
5. **득점(GoalRecord)과 결과 점수는 별개** → 득점 랭킹과 결과 점수가 어긋날 수 있음.
6. **권한 검증 부재**: 소유권/역할 검증 없음. 득점 조회(`GET matches/list`)는 Public.
7. **토너먼트 승자 진출 로직 없음, standings 재계산 스텁.**
8. 일부 생성 바디가 DTO가 아니라 **엔티티 그대로**(TournamentRounds) → 검증 약함.
9. 페이지 메타 `last_page`는 **snake_case**.
10. DELETE의 `204 No Content` 명시 여부는 **확인 필요**(코드 미확인).

---

## 4. 현재 프런트 연동 상태 (이 저장소 기준)

> 백엔드 계약 대비 프런트가 어디까지 맞춰져 있는지. 백엔드가 틀린 게 아니라 **프런트가 계약과 어긋난** 지점이다.

| 도메인 | 계약 경로(베이스) | 프런트 현황 | 상태 |
|---|---|---|---|
| 경기 결과 | `/competitions/:id/matches` | `src/api/matchResult.ts`가 `/match-results/...` 사용 | ❌ 경로 불일치 |
| 경기 일정(Match) | `/competitions/:id/matches` | `src/api/matchSchedule.ts`가 `/match-schedules` 사용 | ❌ 경로 불일치 |
| 득점(GoalRecord) | `/competitions/:id/matches/create\|remove\|list` | 프런트 API 모듈 **없음** | ⬜ 미연동 |
| 순위(Standings) | `/competitions/:id/standings` (tournamentId) | 호출 없음, 화면은 스텁 | ⬜ 미연동 |
| 득점 랭킹(Scorers) | `/competitions/:id/scorers` (tournamentId) | 호출 없음 | ⬜ 미연동 |
| 응답 매핑 | `MatchResultDto.match`(= `MatchDto`) | 프런트 타입은 `IMatchResultDto.matchSchedule`, 필드명 상이 | ⚠️ 매핑 필요 |

---

## 5. 앞으로 할 일 체크리스트 (제안, 미착수)

- [ ] 경기 결과 API 경로를 계약(`/competitions/:id/matches`)에 맞추기 + 응답 매핑(`match`/`MatchDto`)
- [ ] 경기 일정(Match) API 경로를 계약에 맞추기
- [ ] 득점(GoalRecord) API 모듈/훅 신규 추가 (create/remove/list)
- [ ] 순위/득점 랭킹 연동 시 **tournamentId** 사용 확인
- [ ] 라우트 충돌 엔드포인트(matches/stages) 실제 호출 검증 후 연동
- [ ] 결과 중복 생성·권한 검증 등 백엔드 이슈는 **별도 작업**으로 분리해 제안

> 각 항목은 기능 구현 단계에서 계약을 기준으로 진행한다. 백엔드 계약 자체는 임의로 바꾸지 않는다.
