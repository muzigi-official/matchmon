---
inclusion: fileMatch
fileMatchPattern: 'src/{api,hooks/queries,queryKeys}/**'
---

# MatchMon · 백엔드 API 계약 (기준 문서)

> **이 문서는 프런트엔드 API 구현/수정 시 참조하는 공식 기준 문서다.**
> 아래 "현행(As-Is) 계약" 본문은 사용자가 제공한 `MatchMon Backend API Contract (현행 / As-Is)`를
> 누락·요약 없이 그대로 보관한 것이다.
>
> - **출처**: 사용자 제공 문서 `MatchMon Backend API Contract (현행 / As-Is)` — 백엔드 소스(`src/`)의
>   `*.controller.ts`, `*.dto.ts`, `*.entity.ts`, `global-exception.filter.ts`를 직접 확인해 작성됨.
> - **작성 기준일**: 2026-10-14
> - **문서 등록일(이 저장소)**: 2026-10-14
> - **성격**: 현행 구현(As-Is) 계약. 이상적 재설계안(Redesign)이 아니다.
>
> ## 사용 규칙 (중요)
> - 백엔드는 **별도 저장소**다. 이 프런트엔드 저장소에서는 백엔드 소스를 직접 확인할 수 없으므로,
>   본 계약을 백엔드 동작의 기준으로 삼는다. 계약에 없는 경로/필드를 추측해 만들지 않는다.
> - 아래 "주의사항 / 알려진 이슈"에 기록된 **라우트 충돌/공유 엔드포인트**는 모듈 등록 순서에 의존하므로,
>   **실제 호출 결과를 런타임 검증하기 전까지 정상 동작을 가정하지 않는다.**
> - 만약 별도의 `Frontend API Contract (Redesign)` 명세가 존재하더라도, 그것은 **현행 백엔드 계약이 아니다.**
>   Redesign 명세를 현행(As-Is) 계약으로 취급하지 않는다. 둘을 혼동하지 않는다.
> - 본 계약과 기존 프런트엔드 구현(`src/api/*` 등)이 다르면, 계약을 기준으로 **불일치**로 기록/보고한다
>   (아래 "현행 프런트 구현과의 주요 불일치" 참고).

---

<!-- ↓↓↓ 여기서부터 사용자 제공 계약 전문(원문 보존) ↓↓↓ -->

# MatchMon Backend API Contract (현행 / As-Is)

> 이 문서는 **실제 백엔드 코드(src/)를 직접 확인해 작성한 "현재 구현 그대로"의 계약**입니다.
> 이상적인 재설계안이 아니라, 지금 서버가 실제로 응답하는 경로/필드 기준입니다.
> 작성 기준일: 2026-10-14 / 근거: 각 `*.controller.ts`, `*.dto.ts`, `*.entity.ts`, `global-exception.filter.ts`
>
> ⚠️ 알려진 주의사항은 문서 하단 "주의사항 / 알려진 이슈" 참고.

## 기본 원칙
- Base URL: `http://localhost:3000` (서버 포트 3000, `main.ts`)
- Swagger: `GET /api`
- 인증: `Authorization: Bearer <access_token>` (전역 AuthGuard, `@Public` 제외 모든 경로)
- CORS: 전체 허용(`app.enableCors()`)
- 중요: 현재 구현은 **Match와 MatchResult가 분리**되어 있습니다. (경기 일정/정보 = Match, 결과 = MatchResult)

## 공통

### 인증 토큰 전달
- 헤더 `Authorization: Bearer <token>`
- 일부 서비스는 JWT payload를 `jwtUser` 쿼리로 받음(아래 해당 엔드포인트에 표기)

### Error 응답 (GlobalExceptionFilter 실제 출력과 일치)
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error message or string[]",
  "error": "Bad Request",
  "timestamp": "2026-10-14T00:00:00.000Z",
  "path": "/request-path"
}
```
- `message`는 문자열 또는 문자열 배열(class-validator 다중 메시지 시 배열).

### Enum (실제 값)
```ts
// 경기 결과 승패
type EMatchResult = 'HOME_WIN' | 'AWAY_WIN' | 'DRAW';
// 경기/결과 상태
type EMatchResultState = 'COMPLETED' | 'PENDING_RESULT' | 'WAITING';
```

---

## Auth  (`/auth`)

| 메서드 · 경로 | 인증 | Body | 비고 |
|---|---|---|---|
| `POST /auth/signUp` | Public | `SignupDto` | 회원가입 |
| `POST /auth/signIn` | Public | `{ username, password }` | 로그인, JWT 발급 |
| `GET /auth/profile` | Bearer | — | JWT payload(jwtUser) 반환 |

---

## Competitions  (`/competitions`)

| 메서드 · 경로 | 인증 | Body / Query | 응답 |
|---|---|---|---|
| `POST /competitions/create` | Bearer | `CreateCompetitionDto` | `Competition` |
| `GET /competitions/get/:id` | Public | — | `Competition` |
| `GET /competitions/list?page=1` | Public | query `page`(기본 1) | `CompetitionPageReturn` |
| `PATCH /competitions/:id` | Bearer | `UpdateCompetitionDto` | 수정 결과 |
| `DELETE /competitions/:id` | Bearer | — | `void` |
| `POST /competitions/apply` | Bearer | `ApplyCompetitionDto` | `'등록 성공'` \| `'등록 실패'` (문자열) |

### CompetitionPageReturn (페이지네이션 응답 형태)
```ts
// PageDto(src/dto/pageReturn.dto.ts)를 상속.
interface CompetitionPageReturn {
  data: Competition[];
  meta: {
    total: number;
    page: number;
    last_page: number;   // ⚠️ snake_case (camelCase 아님)
  };
}
```

---

## Participants  (`/competitions/:id/participants`)

> 참고: 설계상의 `POST participants`(참가 생성), `DELETE participants/:id`는 **현재 없음**.
> 선수 추가/제거는 PATCH로, 조회는 쿼리 파라미터 기반.

| 메서드 · 경로 | 인증 | Body / Query | 응답 |
|---|---|---|---|
| `PATCH /competitions/:id/participants/addPlayers` | Bearer | Body `AddPlayerDto {participantId, playerId}`, Query `jwtUser` | `boolean` |
| `PATCH /competitions/:id/participants/removePlayer` | Bearer | Body `AddPlayerDto`, Query `jwtUser` | `boolean` |
| `GET /competitions/:id/participants/list?competitionId=` | Public | query `competitionId` | `Participant[]` |
| `GET /competitions/:id/participants/players?participantId=` | Public | query `participantId` | `Player[]` |
| `GET /competitions/:id/participants/relatedTeam?participantId=` | Public | query `participantId` | `Team` (선수 포함) |

---

## Stages  (`/competitions/:id/stages`)

> ⚠️ 통합 `type: GROUP|TOURNAMENT` 엔드포인트는 **없음**. 대신 GroupStages / Tournaments / TournamentRounds
> **세 컨트롤러가 모두 `competitions/:id/stages` 베이스를 공유**합니다. 경로가 서로 겹쳐 라우트 충돌 위험이 큼(하단 이슈 참고).

### Group Stages (GroupStagesController)
| 메서드 · 경로 | 인증 | Body / Param | 응답 |
|---|---|---|---|
| `GET /competitions/:id/stages/competition/:competitionId` | Bearer | — | `GroupStageWithTeamsDto[]` |
| `POST /competitions/:id/stages` | Bearer | `CreateGroupStageDto` | `GroupStage` |
| `POST /competitions/:id/stages/add-team` | Bearer | `AddTeamToGroupStageDto` | `GroupStage` |
| `DELETE /competitions/:id/stages/:id` | Bearer | `:id` = groupStageId | `void` (사용 중이면 `ConflictException`) |
| `DELETE /competitions/:id/stages/:groupId/remove-team/:teamId` | Bearer | — | `GroupStage` |

### Tournaments (TournamentsController)
| 메서드 · 경로 | 인증 | Body / Query | 응답 |
|---|---|---|---|
| `POST /competitions/:id/stages/create` | Bearer | Body `CreateTournamentDto`, Query `jwtUser` | `boolean` |
| `GET /competitions/:id/stages/get?groupKey=` | Public | query `groupKey` | `Tournament[]` |
| `GET /competitions/:id/stages/list?competitionId=` | Public | query `competitionId` | `Competition` |

### Tournament Rounds (TournamentRoundsController)
| 메서드 · 경로 | 인증 | Body / Param | 응답 |
|---|---|---|---|
| `GET /competitions/:id/stages` | Bearer | — | `TournamentRound[]` |
| `GET /competitions/:id/stages/:id` | Bearer | `:id` = roundId | `TournamentRound` |
| `POST /competitions/:id/stages` | Bearer | `TournamentRound`(엔티티 바디) | `TournamentRound` |
| `PUT /competitions/:id/stages/:id` | Bearer | `TournamentRound` | `TournamentRound` |
| `DELETE /competitions/:id/stages/:id` | Bearer | `:id` = roundId | 삭제 결과 |

> ⚠️ **Stages 라우트 충돌 주의**:
> - `POST /stages`가 GroupStages와 TournamentRounds **양쪽에 정의**됨 → 모듈 등록 순서에 따라 하나만 동작.
> - `GET /stages`(Rounds findAll), `GET /stages/:id`(Rounds), `DELETE /stages/:id`(GroupStages & Rounds)도 겹침.
> - 실제 어느 핸들러가 호출되는지는 런타임 등록 순서에 의존하므로, 프런트 연동 전 **엔드포인트별 동작 검증 필요**.

---

## Matches — 경기(일정/정보)  (`/competitions/:id/matches`, MatchController)

> ⚠️ 아래 Matches / Match Results / Goals **세 컨트롤러가 모두 `competitions/:id/matches` 베이스를 공유**합니다. (라우트 충돌 주의, 하단 참고)

| 메서드 · 경로 | 인증 | Body | 응답 |
|---|---|---|---|
| `POST /competitions/:id/matches/group-stage` | Bearer | `CreateMatchGroupStageDto` | 생성된 Match |
| `POST /competitions/:id/matches/tournament` | Bearer | `CreateMatchTournamentDto` | 생성된 Match |
| `GET /competitions/:id/matches` | Bearer | — | Match[] |
| `GET /competitions/:id/matches/:id` | Bearer | — | Match |
| `PUT /competitions/:id/matches/:id` | Bearer | `Partial<CreateMatchGroupStageDto \| CreateMatchTournamentDto>` | 수정된 Match |
| `DELETE /competitions/:id/matches/:id` | Bearer | — | 삭제 결과 |

### CreateMatchGroupStageDto
```ts
{
  date: string;              // 예: '2024-07-07'
  stadium: string;
  startTime: string;         // 'HH:mm' 예: '14:00'
  endTime: string;           // 'HH:mm'
  groupStageId: number;
  homeParticipantId: number;
  awayParticipantId: number;
}
```

### CreateMatchTournamentDto
```ts
{
  date: string;
  stadium: string;
  startTime: string;         // 'HH:mm'
  endTime: string;           // 'HH:mm'
  tournamentId: number;      // group-stage와 달리 tournamentId
  homeParticipantId: number;
  awayParticipantId: number;
}
```

---

## Match Results — 경기 결과  (`/competitions/:id/matches`, MatchResultsController)

| 메서드 · 경로 | 인증 | Body / Param | 응답 |
|---|---|---|---|
| `POST /competitions/:id/matches` | Bearer | `CreateMatchResultDto` | `MatchResult` |
| `PUT /competitions/:id/matches/:id` | Bearer | `UpdateMatchResultDto` (`:id` = matchResultId) | `MatchResult` |
| `GET /competitions/:id/matches/:matchId` | Bearer | — | `MatchResultDto` |
| `GET /competitions/:id/matches/competition/:competitionId/results` | Bearer | — | `MatchResultDto[]` |
| `GET /competitions/:id/matches/:matchId/result` | Bearer | — | `MatchResultDto` (결과 없으면 score 0, state `WAITING` 기본값 반환) |

### CreateMatchResultDto
```ts
{
  matchId?: number;          // optional (주의: 없으면 Match 매칭 불가)
  homeScore: number;
  awayScore: number;
  result?: EMatchResult;     // 'HOME_WIN' | 'AWAY_WIN' | 'DRAW'
  state: EMatchResultState;  // 필수
  isPenaltyShootout: boolean;
  homePenaltyScore?: number;
  awayPenaltyScore?: number;
}
```

### UpdateMatchResultDto
```ts
{
  matchId?: number;
  homeScore?: number;
  awayScore?: number;
  result?: EMatchResult;
  state?: EMatchResultState; // 데코레이터상 IsNotEmpty + optional 혼재(사실상 선택 전송)
  isPenaltyShootout?: boolean;
  homePenaltyScore?: number;
  awayPenaltyScore?: number;
}
```

### MatchResultDto (응답)
```ts
{
  match: MatchDto;
  homeScore: number;
  awayScore: number;
  isPenaltyShootout: boolean;
  homePenaltyScore?: number;
  awayPenaltyScore?: number;
  result: EMatchResult | null;
  state: EMatchResultState;
}
```

### MatchDto (응답 내 match)
```ts
{
  id: number;
  roundId?: number;
  groupStageId?: number;
  competitionId: number;
  homeParticipantId: number;
  awayParticipantId: number;
  stadium: string;
  matchDate: string;              // 'YYYY-MM-DD'
  matchTime: string;             // startTime 'HH:mm'
  createdAt: string;
  homeParticipantName: string;   // 팀 이름
  awayParticipantName: string;   // 팀 이름
}
```

---

## Goals — 득점 기록  (`/competitions/:id/matches`, RecordsController)

> 설계상의 `/matches/:matchId/goals` 경로는 **없음**. 실제는 아래와 같음.

| 메서드 · 경로 | 인증 | Body / Query | 응답 |
|---|---|---|---|
| `POST /competitions/:id/matches/create` | Bearer | `CreateRecordDto` | `GoalRecord` |
| `POST /competitions/:id/matches/remove` | Bearer | `DeleteRecordDto` | `boolean` |
| `GET /competitions/:id/matches/list?matchId=` | **Public** | query `matchId` | `GoalRecord[]` |
| `DELETE /competitions/:id/matches/:id` | Bearer | `:id` = goalRecordId | `void` |

### CreateRecordDto / DeleteRecordDto (검증 데코레이터 없음)
```ts
{
  playerId: number;
  matchId: number;
  teamId?: number;
  minute?: number;
  event: string;      // 이벤트 종류 문자열
}
```

### GoalRecord (응답)
```ts
{
  id: number;
  event: string;
  minute: number;
  // 관계: match, player, team (ManyToOne)
}
```

---

## Standings — 조별 순위  (`/competitions/:id/standings`)

| 메서드 · 경로 | 인증 | Query | 비고 |
|---|---|---|---|
| `GET /competitions/:id/standings?groupLabel=` | Bearer | `groupLabel` 필수 | ⚠️ `:id`를 **tournamentId**로 사용 (competitionId 아님) |

응답(서비스 반환):
```ts
{
  tournamentId: number;
  groupLabel: string;
  standings: Array<{
    teamId: number; teamName: string; participantId: number;
    played: number; won: number; draw: number; lost: number;
    goalsFor: number; goalsAgainst: number; goalDifference: number; points: number;
  }>; // 정렬: 승점 → 골득실 → 다득점
}
```

---

## Scorers — 득점 랭킹  (`/competitions/:id/scorers`)

| 메서드 · 경로 | 인증 | 비고 |
|---|---|---|
| `GET /competitions/:id/scorers` | Bearer | ⚠️ `:id`를 **tournamentId**로 사용 |

응답:
```ts
Array<{
  playerId: number;
  playerName: string;   // player.nickName
  teamName: string;
  goalCount: number;    // GoalRecord 개수 집계, goalCount DESC
}>
```

---

## Stats  (`/competitions/:id/stats`)

| 메서드 · 경로 | 인증 | 비고 |
|---|---|---|
| `GET /competitions/:id/stats` | Bearer | 현재 `{ competitionId }`만 echo 반환 (**미구현 스텁**) |

---

## SSE — 실시간  (`/realtime/tournaments/:id/events`)

| 메서드 · 경로 | 인증 | 비고 |
|---|---|---|
| `GET /realtime/tournaments/:id/events` | Bearer (전역 가드 적용) | `:id` = tournamentId, `@Sse` 스트림 |

이벤트 타입 (실제 코드):
```ts
type TSseEventType =
  | 'match.updated'
  | 'standings.updated'
  | 'topscorers.updated';   // 'scorers.updated' 아님에 주의

// payload는 현재 { matchId } 정도만 포함 → 구독자가 재조회 필요
```

---

## Match Settings  (`/match-settings`)

| 메서드 · 경로 | 인증 | Body |
|---|---|---|
| `POST /match-settings` | Bearer | `CreateMatchSettingDto` |
| `GET /match-settings` | Bearer | — |
| `GET /match-settings/:id` | Bearer | — |
| `PUT /match-settings/:id` | Bearer | `UpdateMatchSettingDto` |
| `DELETE /match-settings/:id` | Bearer | — |

---

## 주의사항 / 알려진 이슈 (프런트 연동 시 반드시 참고)

1. **라우트 공유/충돌**: `competitions/:id/matches` 베이스를 MatchController / MatchResultsController / RecordsController 3개가 공유.
   - `GET .../matches/:id`(Match)와 `GET .../matches/:matchId`(결과)가 동일 패턴 → 실제 매칭이 모듈 등록 순서에 의존. 호출 시 동작 확인 필요.
   - `GET .../matches/competition/:competitionId/results`가 `GET .../matches/:matchId`에 가로채일 수 있음.
2. **standings / scorers / SSE의 `:id`는 tournamentId**. 경로 이름은 `competitions/:id`지만 서비스는 tournamentId로 처리. competitionId를 그대로 넣으면 조회 실패 가능.
3. **점수 이중 저장**: Match(homeScore/awayScore)와 MatchResult(homeScore/awayScore)가 별도 저장. 결과 입력 흐름(MatchResult 생성)이 Match 점수에 동기화됨.
4. **결과 중복 생성 위험**: MatchResult↔Match 1:1 유니크 제약 없음, create가 항상 insert → 동일 경기 결과 재입력 시 중복 레코드 가능.
5. **득점(GoalRecord)과 결과 점수는 분리**: 득점 랭킹은 GoalRecord 개수 기준, 결과 점수와 별개로 어긋날 수 있음.
6. **권한 검증 부재**: 경기/결과/레코드 엔드포인트에 리소스 소유권·역할 검증 없음. `GET matches/list`(Goals 조회)는 인증 면제(Public).
7. **토너먼트 승자 진출(advance) 로직 없음**, standings 재계산 트리거는 빈 스텁.
8. **Stages 라우트 충돌**: `competitions/:id/stages` 베이스를 GroupStages / Tournaments / TournamentRounds 3개가 공유.
   특히 `POST /stages`, `GET /stages/:id`, `DELETE /stages/:id`가 중복 정의 → 등록 순서 의존. 연동 전 동작 검증 필수.
9. **일부 생성 바디가 엔티티 그대로**: TournamentRounds의 create/update는 DTO가 아니라 `TournamentRound` 엔티티를 바디로 받음(검증 약함).
10. **페이지 메타 필드는 snake_case**: `meta.last_page` (프런트 매핑 시 주의).
11. **DELETE 응답**: 반환은 `void`/삭제 결과이며, 명시적 `204 No Content` 상태코드 설정은 코드에서 확인되지 않음(**확인 필요**).

> 1~10은 코드로 확인된 사실. 11(DELETE 상태코드)만 **확인 필요**로 남음.

<!-- ↑↑↑ 사용자 제공 계약 전문 끝 ↑↑↑ -->

---

## 참고: 현행 프런트 구현과 계약의 주요 불일치 (프런트 측 관찰)

> 아래는 이 저장소의 프런트 코드(`src/api/*` 등)와 위 **현행 백엔드 계약**을 대조해 관찰한 불일치다.
> 백엔드 계약을 기준으로 하며, 프런트가 계약과 다른 경로/필드를 쓰고 있음을 기록한 것이다.
> (백엔드가 틀렸다는 뜻이 아니라, 프런트가 계약과 어긋나 있음을 의미한다.)

- **경기 결과 경로 불일치**: 프런트 `src/api/matchResult.ts`는 `/match-results/...` 베이스를 사용하지만,
  계약상 경기 결과는 `/competitions/:id/matches/...` 베이스다. 프런트 구현이 현행 계약과 다름.
- **경기 일정(Match)**: 프런트 `src/api/matchSchedule.ts`는 `/match-schedules` 베이스를 사용하지만,
  계약상 경기(일정/정보)는 `/competitions/:id/matches` 베이스(`MatchController`)다.
- **득점(GoalRecord)**: 프런트에 득점 기록 API 모듈이 없다. 계약상 `/competitions/:id/matches/create|remove|list`
  (RecordsController)로 존재한다. Match / MatchResult / GoalRecord는 서로 다른 도메인이다.
- **순위/득점 랭킹**: 프런트에 standings/scorers 호출이 없다. 계약상 각각
  `/competitions/:id/standings?groupLabel=`, `/competitions/:id/scorers`로 존재하며, 이때 `:id`는 **tournamentId**다.
- **MatchResult 응답 형태**: 계약은 `MatchResultDto.match`(= `MatchDto`) 아래에 경기 정보를 둔다
  (예: `match.id`, `match.matchDate`, `match.matchTime`, `match.homeParticipantName`). 프런트 타입
  `IMatchResultDto`는 `matchSchedule`을 쓰고 필드명이 다르다. 연동 시 응답 매핑이 필요.

> 이 불일치 목록은 "프런트를 계약에 맞추기 위한 참조"이며, 구체적 수정은 각 기능 구현 단계에서
> 계약을 기준으로 진행한다. 백엔드 계약 자체는 임의로 바꾸지 않는다.
