---
inclusion: always
---

# MatchMon · 개발 규칙 (development-rules)

> 역할 분담: 사용자가 제품 방향·요구사항을 결정하고, 에이전트는 기존 코드 분석과
> 구현·테스트를 담당한다. 이 저장소는 **프런트엔드 단독**이며 백엔드는 별도 저장소에 있다.

## 개발 원칙
1. 구현 전에 기존 코드와 API 계약을 먼저 분석한다.
2. 백엔드의 실제 Controller / DTO / 응답 구조를 기준으로 프런트엔드를 구현한다.
3. 백엔드 API 경로와 필드명을 추측하지 않는다. 불확실하면 확인한다.
4. 기존 API 함수, 쿼리 훅, 타입, 컴포넌트를 **우선 재사용**한다. (`src/api`, `src/hooks/queries`,
   `src/queryKeys`, `src/types/global.d.ts`, `src/components/common`)
5. 요청 범위 밖의 리팩터링을 하지 않는다.
6. 중요한 요구사항이 불명확하면 임의로 결정하지 않고 질문한다.

## React / TypeScript
1. 기존 프로젝트의 코딩 스타일(ESLint/Prettier 설정)을 따른다.
2. 타입 오류를 해결할 때 무분별하게 `any`를 쓰지 않는다. 올바른 타입(예: `IMatchResultDto`,
   `IMatchScheduleDto`)으로 해결한다.
3. 기존 상태 관리 수단을 확인하지 않고 중복 상태를 추가하지 않는다.
   - 서버 상태: **react-query v3** (훅은 `src/hooks/queries/*`)
   - 클라이언트 전역 상태: **Zustand** (`src/store/*`)
   - Redux는 `package.json`에 있으나 `src`에서 사용처가 확인되지 않음 → 임의 도입 금지.
4. 서버 데이터(react-query)와 UI 상태(local/Zustand)를 구분한다.
5. API 요청의 로딩·성공·실패 상태를 모두 고려한다.
6. 저장(mutation) 성공 후 관련 쿼리의 무효화/재조회가 필요한지 검토한다.
   - 예: 경기 결과 저장 시 `matchResultQueryKeys.list(competitionId)` 무효화가 현재 누락되어 있음.

## 백엔드 연동
> 공식 기준 문서: **`.kiro/steering/api-contract.md`** (현행 As-Is 백엔드 계약). 백엔드는 별도
> 저장소이며 이 저장소에서 백엔드 소스를 직접 확인할 수 없다. 따라서 아래 계약을 기준으로 삼는다.

1. **API를 구현/수정하기 전에 `api-contract.md`와 기존 API 모듈(`src/api/*`)을 먼저 확인한다.**
2. **계약에 없는 API 경로·요청 필드·응답 필드를 추측해서 만들지 않는다.** 응답 필드·식별자·요청
   DTO는 계약과 대조한다. (예: `MatchResultDto.match`(= `MatchDto`)의 `matchDate`/`matchTime`/
   `homeParticipantName` 등 실제 필드명을 그대로 쓴다.)
3. **기존 프런트 구현과 계약이 다르면, 임의로 고치지 말고 불일치 원인과 수정 범위를 먼저 보고한다.**
   (예: 프런트 `src/api/matchResult.ts`의 `/match-results/...`는 계약의
   `/competitions/:id/matches/...`와 다름 — `api-contract.md` 하단 "불일치" 참고.)
4. **`competitionId`와 `tournamentId`를 구분한다.** 계약상 standings/scorers/SSE의 경로는
   `competitions/:id`지만 서비스는 **`:id`를 tournamentId로 처리**한다. competitionId를 그대로
   넣지 않는다.
5. **Match, MatchResult, GoalRecord를 서로 다른 도메인으로 취급한다.**
   - Match = 경기 일정/정보, MatchResult = 경기 결과(집계 점수), GoalRecord = 선수별 득점 기록.
   - 점수는 Match와 MatchResult에 이중 저장되고, 득점 랭킹은 GoalRecord 개수 기준이라 결과 점수와
     어긋날 수 있다(계약 이슈 3·5). 세 도메인의 데이터 정합성을 함께 고려한다.
6. **라우트 충돌이 기록된 엔드포인트는 실제 호출 결과를 검증하기 전까지 정상 동작을 가정하지 않는다.**
   - `competitions/:id/matches`(Match/MatchResult/Goals 공유), `competitions/:id/stages`
     (GroupStages/Tournaments/TournamentRounds 공유)는 모듈 등록 순서에 의존(계약 이슈 1·8).
     연동 전 엔드포인트별 동작을 런타임 검증한다.
7. **인증이 필요한 요청은 기존 인증·Axios 설정을 확인하고 Bearer 토큰 전달 방식을 따른다.**
   - `src/utils/api.ts`의 `requestAPI` 인스턴스와 `src/api/loginChecker.ts`의 요청 인터셉터
     (`Authorization: Bearer <access_token>`, localStorage)를 재사용한다. 토큰 전달 방식을
     임의로 바꾸지 않는다. 일부 엔드포인트는 `jwtUser` 쿼리를 추가로 요구함(계약 참고).
8. **백엔드 변경이 필요하면 프런트에서 임의로 계약을 바꾸지 말고 별도 작업으로 분리한다.**
   먼저 이유와 대안을 제시하고 승인받는다. (예: 선수별 득점 저장 스펙 변경, 결과 중복 생성 방지
   유니크 제약, 토너먼트 승자 진출 로직 등은 백엔드 책임.)
9. 프런트엔드에서 해결 가능한 문제와 백엔드 수정이 필요한 문제를 구분해 보고한다.
10. 경기 결과·순위·득점 기록·토너먼트의 데이터 정합성을 고려한다. (결과 수정/삭제가 순위와
    토너먼트 진출에 미치는 영향 포함. 계약상 standings 재계산/승자 진출은 아직 스텁.)

## 안전과 품질
1. 기존 Git 변경사항과 미커밋 파일을 보존한다.
2. 파일 삭제·초기화·강제 덮어쓰기는 사전 승인 없이 하지 않는다.
3. 인증정보·개인정보를 출력하거나 문서에 기록하지 않는다. (`.env`, 토큰, `localStorage`의
   `access_token` 값 등)
4. 변경 후 가능한 범위에서 타입 검사(`npx tsc --noEmit`) → 빌드(`yarn build`) →
   린트(`yarn lint`) → 관련 테스트를 실행한다.
5. 실행하지 않은 검증을 성공했다고 보고하지 않는다.
6. 기존 테스트 도구가 정상 작동하지 않으면(현재 `react-scripts test` 미동작) 원인을 먼저 파악하고
   **별도 작업**으로 제안한다. 자동 수정 명령(`lint:fix`, `format`)은 분석/비요청 단계에서 쓰지 않는다.

## 작업 모드
- **분석 요청**: 소스 코드를 수정하지 않는다. 읽기 전용 + 안전한 검증 명령만 사용한다.
- **설계 요청**: 변경 대상과 구현 계획만 제안한다. 코드는 작성하지 않는다.
- **구현 요청**: 승인된 범위만 수정하고, 위 "안전과 품질" 절차로 검증한다.

## 현재 알려진 작업 선행 조건 (코드/실행으로 확인)
- 빌드가 현재 실패 상태다(`tsc` 타입 오류). 신규 작업 시 기존 오류와 내 변경으로 생긴 오류를 구분한다.
- 라우트 불일치(`/admin/matchReport` 미등록, `baracket` 오타 등)와 Redux 잔재
  (`admin/competition/team/Team.tsx`의 `@/redux/*` import)는 별도 정리 대상이다.
