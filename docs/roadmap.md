# MatchMon 프런트엔드 로드맵

> 작성 기준일: 2026-10-14 · 기준 브랜치: `feature/#60`
> 근거: 코드/빌드 분석과 `.kiro/steering/api-contract.md`(현행 백엔드 계약 As-Is).
> 이 문서는 사람이 읽고 추적하는 용도다. 모든 항목은 분석으로 확인된 사실 기반이며, 아직 미착수다.

## 우선순위 원칙
"지금 깨져 있는 것 → 핵심 기능 완성 → 신규 도메인 연동 → 정리/하드닝" 순서.
**P0 → P1 의존성은 유지한다**(빌드가 깨진 상태면 이후 작업을 검증할 수 없다).

| 단계 | 목표 | 의존성 |
|---|---|---|
| P0 | 빌드 복구 | 모든 작업의 전제 |
| P1 | 경기 결과 입력 완성(+선수별 득점) | P0 |
| P2 | 순위/득점 랭킹 연동 | P0, (일부) P1 |
| P3 | 라우팅/내비 정합성 | P0 |
| P4 | 환경/빌드/테스트 하드닝 | 독립 |
| BE | 백엔드로 분리 | 프런트 임의 변경 금지 |

---

## P0 — 빌드 복구 (최우선)
현재 `npx tsc --noEmit` 실패(종료 코드 2) → `yarn build` 불가. 다른 작업의 검증 전제.

- [ ] `src/pages/competitionUser/matchReport/Detail.tsx` 잘못된 필드 접근 수정
      (`matchScheduleId`/`matchTime`/`homeTeamName`/`awayTeamName` → `matchSchedule.*`) — 타입 오류 4건
- [ ] `src/pages/admin/competition/team/Team.tsx` 깨진 import 처리
      (`@/redux/store`, `@/redux/hooks`, `@/api/joinTeamComp`, `@/components/button/MyButton`,
      `@/components/table/DataTable`) — Redux 잔재 정리 또는 경로 교정
- [ ] 미사용 변수/임포트(`TS6133`), 스토리북 타입 오류 정리
- **검증**: `npx tsc --noEmit` 통과 → `yarn build` 성공

## P1 — 경기 결과 입력 기능 완성 (핵심 흐름)
목록 조회는 동작하나 입력/저장이 끊김. 선수별 득점(GoalRecord)까지 포함.

- [ ] **계약 경로 정합화**: 프런트 `/match-results/...` → 계약 `/competitions/:id/matches/...`.
      응답 매핑(`MatchResultDto.match` = `MatchDto`, 필드명 `matchDate`/`matchTime`/`homeParticipantName` 등)
- [ ] `Detail.tsx`에 `ScoreBoard` 재연결 + 선택 경기 정상 탐색
- [ ] 저장 연결: `useCreateMatchResult`/`useUpdateMatchResult` 실제 호출 +
      성공 토스트 + **목록 쿼리키(`matchResultQueryKeys.list`) 무효화**(현재 누락)
- [ ] 입력 유효성: 음수 방지, 승부차기(`isPenaltyShootout`) 처리, `result`/`state` 세팅
- [ ] **선수별 득점(GoalRecord) 연동**: 득점 API 모듈/훅 신규 추가(`create`/`remove`/`list`).
      Match / MatchResult / GoalRecord는 서로 다른 도메인으로 취급
- **검증**: 입력 → 저장 → 목록 반영(백엔드 `localhost:3000` 필요),
      라우트 충돌 엔드포인트(`matches`)는 실제 호출로 동작 확인

## P2 — 순위 / 득점 랭킹 연동
현재 `rank`, `user/Ranking`은 스텁. 계약에 엔드포인트 존재.

- [ ] Standings 연동: `GET /competitions/:id/standings?groupLabel=` — ⚠️ `:id`는 **tournamentId**
- [ ] Scorers 연동: `GET /competitions/:id/scorers` — ⚠️ `:id`는 **tournamentId**
- [ ] `competitionId` ↔ `tournamentId` 혼동 방지(타입/변수명으로 구분)
- [ ] 스텁 화면 실제 UI 구현 (`rank/index.tsx` 컴포넌트명 `MatchReport` 오기 포함)
- **검증**: tournamentId로 조회 성공 확인, 득점 랭킹 집계 표시

## P3 — 라우팅 / 내비 정합성
- [ ] `/admin/matchReport` 내비 항목이 라우터 미등록 → 라우트 추가 또는 내비 제거
- [ ] `competition/baracket` 오타(→ `bracket`)
- [ ] `path.tsx`의 `/player`↔`/players`, `/ranking`↔`rank` 등 경로 불일치 정리
- **검증**: 각 내비 클릭 → 404/빈 화면 없이 정상 라우팅

## P4 — 환경 / 빌드 / 테스트 하드닝
- [ ] API base URL 하드코딩(`localhost:3000`) → 환경변수(`VITE_APP_BACK_END_POINT`) 복원 + `.env` 체계
- [ ] 테스트 러너 교체: `react-scripts test`(미설치) → Vite 호환(vitest 등).
      기존 테스트 2개(`Pagination.test.tsx`, `components/test/Dropdown.test.tsx`) 복구
- [ ] 상태 관리 정리: 미사용 Redux 의존성 제거 여부 결정(실사용은 Zustand + react-query)
- [ ] 잔재 `console.log` 정리(`Detail.tsx`, `matchSchedule.ts`)
- **검증**: `.env` 전환 후 빌드/실행, 테스트 러너로 기존 테스트 통과

---

## 백엔드로 분리할 항목 (프런트에서 임의 변경 금지, 별도 작업)
계약 이슈 중 프런트가 해결할 수 없는 것들. 필요 시 이유·대안 제시 후 승인받아 백엔드에서 처리.

- [ ] `matches` / `stages` 라우트 충돌(컨트롤러 베이스 공유) — 런타임 검증 후 정리
- [ ] MatchResult 결과 중복 생성(Match↔MatchResult 유니크 제약 없음)
- [ ] 경기/결과/레코드 권한 검증 부재(득점 조회 `GET matches/list`는 Public)
- [ ] 토너먼트 승자 진출(advance) 로직 / standings 재계산 스텁
- [ ] DELETE `204 No Content` 여부 — **확인 필요**(계약 이슈 11)

---

## 참고 문서
- 백엔드 계약(요약, 사람용): `docs/backend-api-contract.md`
- 백엔드 계약(전문, 기준 문서): `.kiro/steering/api-contract.md`
- 개발 규칙: `.kiro/steering/development-rules.md`
- 제품/기술/구조: `.kiro/steering/{product,tech,structure}.md`
