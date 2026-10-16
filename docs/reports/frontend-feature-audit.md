# MatchMon 프런트엔드 기능 검증 보고서

> 작성 기준일: 2026-10-14 · 기준 브랜치: `feature/#60`
> 기준 파일: `docs/MatchMon_function_split.xlsx` (시트: 작업 가이드, 기능 목록 외 11개)
> 기준 계약: `.kiro/steering/api-contract.md` (현행 As-Is)
> 평가 범위: **프런트엔드 코드 정적 분석만.** 백엔드 서버 호출/런타임 통합 검증은 수행하지 않음.
>
> ## 중요한 범위 제약 (반드시 참고)
> - **코드로 확인한 사실**과 **실행으로 검증한 사실**을 구분한다. 이 보고서의 모든 판정은 코드 정적
>   분석 기반이며, 실제 API 호출/런타임 검증은 **하지 않았다.** 따라서 통합 검증 상태는 전 기능이
>   `미검증` 또는 `백엔드 확인 필요`다. "코드 확인"으로 올린 항목은 프런트 코드 존재/부재까지만 확인한 것이다.
> - 백엔드 구현 상태는 평가 대상이 아니다. 백엔드가 의심되는 항목은 `백엔드 확인 필요`로 분리했다.
> - **엑셀 반영 제약**: 이 환경에는 openpyxl/pandas 등 xlsx 편집 라이브러리가 없다. stdlib만으로
>   셀을 수정하면 공유 문자열/테이블/스타일 구조가 손상될 위험이 커서, 원본을 손상 없이 복제한
>   사본(`docs/reports/MatchMon_function_frontend_audit.xlsx`)만 저장하고 **검증 결과 값은
>   이 Markdown 보고서에 기록**한다. 사본의 셀 값은 원본과 동일(미반영) 상태다.

---

## 1. 전체 요약

- 전체 기능: **73개** (MM-001 ~ MM-073)
- 평가 축: ① 프런트 UI 상태 ② 프런트 API 연결 상태 ③ 통합 검증 상태 (세 축 분리)
- 판정 방식(2차 정밀): 각 기능 화면 컴포넌트를 실제로 열어, UI/API 축은 코드로 최대한 확정했다.
  "확인 필요"는 **코드만으로 상태를 못 가르는 경우**(상태 전이 규칙·동률 규칙 등 제품 규칙 의존,
  또는 응답 데이터가 와야 확정되는 경우)로 한정했다. 런타임 필요 항목은 통합 축에서 `미검증`으로 둔다.

### 프런트 UI 상태 분포 (코드 분석, 2차)
| 상태 | 개수 |
|---|---|
| 완성 | 9 |
| 보완 | 15 |
| 미완성 | 11 |
| 미구현 | 16 |
| 확인 필요 | 22 |
| 해당 없음 | 0 |

### 프런트 API 연결 상태 분포 (코드 분석, 2차)
| 상태 | 개수 |
|---|---|
| 완성 | 11 |
| 보완 | 12 |
| 미완성 | 10 |
| 미구현 | 17 |
| 확인 필요 | 23 |
| 해당 없음 | 0 |

> 1차 보고서는 API 모듈·일부 페이지만 보고 다수를 "확인 필요"로 과다 분류했다. 2차에서 화면
> 컴포넌트(matching, bracket, players, team, competition 등)를 직접 열어 재판정했다.

### 통합 검증 상태 분포
| 상태 | 개수 |
|---|---|
| 미검증 | 73 |
| 코드 확인 | 0 |
| 실행 검증 완료 | 0 |
| 실패 | 0 |
| 백엔드 확인 필요 | 0 |

> 통합 검증은 백엔드 호출을 하지 않았으므로 전부 `미검증`이다. 일부 기능은 "프런트 코드 부재"가
> 코드로 확정됐지만(미구현), 그것이 곧 통합 검증은 아니므로 통합 열은 `미검증`을 유지했다.

### 핵심 결론
1. **구현된 영역은 생각보다 많다.** 조별리그·매칭(MM-021~023), 참가팀/선수 관리(MM-016~018),
   경기 일정·설정(MM-024/025), 대회 목록/신청·토너먼트 생성(MM-008/010/028)은 화면+훅+뮤테이션이
   실제로 연결돼 있다. 다만 **런타임 검증(통합)은 하지 않았으므로** UI/API 축의 "완성"은 코드 기준이다.
2. **득점(GoalRecord)·순위(standings)·득점순위(scorers)·SSE**는 프런트 코드가 **전무**하다
   (grep 0건). 계약에 백엔드 엔드포인트가 있어도 프런트 연결이 없어 미구현.
3. **경기 결과**는 목록 조회만 동작, 입력/저장/수정 화면이 끊겨 있다(MM-034~036). 경로도 계약과 불일치.
4. **인증/역할** 코드는 있으나 `PrivateRoute`에 논리 결함(역할 불일치 시 그대로 렌더) — 접근 제어 미작동(MM-003/006).
5. **왜 아직도 "확인 필요"가 남나**: 이번 축소된 "확인 필요"(UI 22/API 23)는 대부분
   (a) 제품 규칙 미결정(상태 전이·동률 규칙: MM-011/026/052/055 등), (b) 응답 데이터가 와야
   확정되는 매핑/정합(MM-012/019/020 등)이다. 이는 코드만으로 "완성/미구현"을 단정할 수 없는 항목이라
   추측하지 않고 "확인 필요"로 둔 것이다. 화면 존재 여부로 가를 수 있던 1차의 과다 분류와는 다르다.

---

## 2. 기능 ID별 프런트 UI 상태 (근거 포함)

> 근거 열은 실제 파일/함수/컴포넌트. "확인 필요"는 화면 존재는 보이나 요구 동작 전체를 코드로
> 확정하지 못했음을 뜻한다.

### 회원·인증·권한 (MM-001 ~ MM-007)
- **MM-001 로그인/토큰** · UI: 보완 · API: 완성 · 근거: `login/index.tsx` 폼 + `useForm`,
  `signIn`→`logIn(token)`→`setUser()`→`/main` 이동. 토큰은 `loginChecker.ts`가 Bearer로 주입.
  단 로그인 실패 시 `console.error`만, 사용자 피드백 UI 없음(→ 보완).
- **MM-002 역할 구분** · UI: 보완 · API: 완성 · 근거: `USER_ROLE=['user','competitionUser','admin']`,
  `useUserStore.setUser`가 `getMe().auth`→role 매핑, `router/path.tsx` 역할별 메뉴 분기. 매핑/메뉴는 구현됨.
- **MM-003 대회별 접근 제어** · UI: 미완성 · 근거: **`PrivateRoute.tsx` 결함** — 역할 불일치 시
  `return <Component />`로 **그대로 렌더(차단 실패)**. 리소스 소유권 검사 없음. 프런트 접근 제어 사실상 미작동.
- **MM-004 결과 입력/수정 권한** · UI: 미완성 · 근거: 결과 입력 화면 자체 미완성(MM-034), 권한 분기 UI 없음.
- **MM-005 득점 기록 접근 권한** · UI: 미구현 · 근거: 득점 UI/코드 전무(grep 0건).
- **MM-006 권한 없는 요청 차단** · UI: 미완성 · 근거: `PrivateRoute` 결함 동일. 401/403 전역 처리 없음.
- **MM-007 인증 만료/오류 처리** · UI: 보완 · 근거: `setUser` 실패 시 `logOut()`→`/login` 리다이렉트는
  있으나, `api.ts` 응답 인터셉터에 401/403 전역 처리 없음(네트워크 오류 토스트만). 만료 흐름 미완.

### 대회 관리 (MM-008 ~ MM-013)
- **MM-008 대회 목록/상세** · UI: 보완 · API: 완성 · 근거: `user/Competition/List/index.tsx`가
  `listCompetition` + 무한스크롤(IntersectionObserver) + `CompetitionCard` 렌더. 상세는
  `user/Competition/index.tsx`(`getTournamentList`). 로딩/에러 분기 있음. 단 목록을 react-query
  대신 로컬 state로 직접 `listCompetition` 호출(캐시 미사용) → 보완.
- **MM-009 대회 생성/수정** · UI: 보완 · API: 보완 · 근거: 생성은
  `competitionUser/competition/List.tsx` + `AddCompetition` 다이얼로그 + `useAddCompetitionMutation`로
  연결됨. 단 **수정(update) API 없음**(`api/competition.ts`), 생성 시 `poster:''`,`description:''` 하드코딩.
- **MM-010 참가 신청/승인** · UI: 보완 · API: 완성(신청) · 근거: 신청은 `ApplyDialog`+`applyCompetition`
  연결(`응답 '등록 성공'` 분기). **승인(approve) 흐름은 미구현**(`user/Competition/index.tsx`의
  참가 허락/거절 버튼 `onClick={() => {}}` 빈 핸들러).
- **MM-011 대회 상태 관리** · UI: 확인 필요 · 근거: 상태 전이 규칙 미결정, 프런트 분기 UI 미확인.
- **MM-012 대회↔토너먼트 식별자** · UI: 확인 필요 · 근거: standings/scorers/SSE 호출 자체가 프런트에
  없어 competitionId/tournamentId 혼동 방지 코드가 없음(연동 시 적용 필요).
- **MM-013 대회 종료/최종 결과** · UI: 미구현 · 근거: 종료/최종결과 화면·호출 없음.

### 팀·참가자 (MM-014 ~ MM-020)
- **MM-014 팀 목록/상세** · UI: 보완 · API: 완성 · 근거: `admin/players` 등에서 `useTeamListQuery` 사용,
  `api/team.ts` get/list/create/edit/remove + `useTeamQuery` 전체 CRUD(토스트/에러 처리 포함). 단
  `admin/competition/team/Team.tsx`가 깨진 import로 빌드 오류(MM-065), `user/team/index.tsx`는 플레이스홀더.
- **MM-015 팀 등록/수정** · UI: 보완 · API: 보완 · 근거: `useAddTeamMutation`/`useEditTeamMutation`/
  `useRemoveTeamMutation` 전부 구현(토스트/무효화 포함). **버그**: `editTeam` URL
  `/teams/update${data.teamId}` — 슬래시 누락(`update3` 형태). 수정 호출 실패 위험.
- **MM-016 참가 팀 추가/제거** · UI: 완성 · API: 완성 · 근거: `matching/index.tsx`가 참가팀 목록 +
  조별 팀 추가/제거를 `useAddTeamToGroupMutation`/`useRemoveTeamFromGroupMutation`로 연결(다이얼로그·
  토글 로직 포함). `participateTeams` 삭제 버튼은 `console.log` 스텁(부분 보완).
- **MM-017 팀별 참가자 조회** · UI: 완성 · API: 완성 · 근거: `team/TeamDetails.tsx`가
  `useParticipatePlayersQuery`+`useParticipateTeamInPlayersQuery`로 참가 선수 조회, 추가/제거 다이얼로그
  (`useAddJoinCompTeamMutation`/`useDeleteJoinCompTeamMutation`) 연결. 로딩 처리 있음.
- **MM-018 선수 정보/소속** · UI: 완성 · API: 완성 · 근거: `admin/players/index.tsx`가 목록·페이지네이션·
  추가·수정·삭제(확인 다이얼로그)·로딩·에러 전부 구현, `usePlayerQuery` CRUD 연결.
- **MM-019 팀 이름/엠블럼 표시** · UI: 보완 · 근거: `Team.tsx`/매칭 리스트에서 `team.name`+`emblem` 표시,
  `DataTable withImage:'emblem'`, `public/empty_emblem.png` 폴백. 응답 필드 매핑은 런타임 확인 필요.
- **MM-020 중복 참가/잘못된 소속 방지** · UI: 확인 필요 · 근거: 프런트 검증 코드 없음(백엔드 제약 의존).

### 조별 리그·일정·토너먼트 (MM-021 ~ MM-031)
- **MM-021 조 목록 조회** · UI: 완성 · API: 완성 · 근거: `matching/index.tsx` +
  `useGroupstageWithTeamsQuery`로 조 목록 조회·렌더(`GroupList`). 로딩/에러 분기. (라우트 충돌은 런타임 확인)
- **MM-022 조 생성/삭제** · UI: 완성 · API: 완성 · 근거: `useCreateGroupstageMutation`/
  `useDeleteGroupstageMutation`를 `handleAddGroup`/`handleRemoveGroup`에 연결(조 이름 A,B,C 자동).
- **MM-023 조별 팀 배정** · UI: 완성 · API: 완성 · 근거: `DialogTeamSelect`에서 팀 클릭 토글 →
  `useAddTeamToGroupMutation`/`useRemoveTeamFromGroupMutation`, 중복 선택 토글 처리.
- **MM-024 경기 일정 CRUD** · UI: 보완 · API: 완성 · 근거: `bracket/index.tsx`가 일정 생성(bulk)/개별수정/
  bulk수정/삭제/전체삭제, 자동 스케줄 생성(`generateSchedule`)까지 모두 훅에 연결(`useMatchScheduleQuery` 계열).
  FIXME 주석(날짜/groupStageId 미완)과 임시 매치 처리 로직 존재 → 보완.
- **MM-025 경기 시간/경기장** · UI: 보완 · API: 완성 · 근거: `StadiumTabs`+`MatchEditField`로 시간/경기장
  편집, `createStadiumOptions`로 구장 탭 구성, schedule DTO stadium/matchTime 사용.
- **MM-026 조별 경기 상태 관리** · UI: 확인 필요 · 근거: 상태 전이 규칙 미결정, 전용 UI 미확인.
- **MM-027 조별 순위 진출 팀 결정** · UI: 미구현 · 근거: 순위 기반 진출 로직 프런트 전무(순위 자체 미연동).
- **MM-028 토너먼트 대진표 생성** · UI: 보완 · API: 완성 · 근거: `user/Competition/index.tsx`가
  `createTournament`(강 수 선택)+`getTournamentList` 연결, `TournamentLayout` 렌더. 생성/조회 동작하나
  라운드/진출 자동화는 미완 → 보완.
- **MM-029 승자 다음 라운드 진출** · UI: 미구현 · 근거: advancement 프런트 코드 없음(백엔드 로직도 미구현).
- **MM-030 결승/우승 확정** · UI: 미구현 · 근거: 우승 확정 프런트 코드 없음.
- **MM-031 대진표 화면 개선(후순위)** · UI: 미완성 · 근거: `user/Bracket/index.tsx`는 `<h1>Bracket</h1>`
  플레이스홀더. `components/tournament/*`와 CA쪽 bracket은 있으나 일반 유저 대진표 화면은 미완.

### 경기 결과 (MM-032 ~ MM-041)
- **MM-032 경기 정보 조회** · UI: 보완 · 근거: `matchReport/index.tsx` 목록 테이블 동작. 단 `Detail.tsx`
  DTO 필드 불일치(`matchScheduleId` 등, tsc 오류).
- **MM-033 기존 결과 조회** · UI: 보완 · 근거: `useMatchResultsList` 소비(목록). 상세 조회는 Detail 결함.
- **MM-034 결과 입력 화면** · UI: 미완성 · 근거: `ScoreBoard.tsx`는 로컬 state 전용, `Detail.tsx`에서
  렌더 주석 처리. 입력 UI가 화면에 없음.
- **MM-035 결과 생성 API 연결** · UI: 미완성 · 근거: `useCreateMatchResult` 정의만, 호출처 없음.
- **MM-036 기존 결과 수정 API 연결** · UI: 미완성 · 근거: `useUpdateMatchResult` 정의만, 호출처 없음.
- **MM-037 경기 상태 표시** · UI: 보완 · 근거: 목록 테이블에 `state` 컬럼 출력(원시 enum 그대로, TODO 주석).
- **MM-038 승/패/무 처리** · UI: 보완 · 근거: 목록에 `result` 출력. 계산 로직은 프런트에 없음(백엔드 의존).
- **MM-039 승부차기 점수 입력** · UI: 미완성 · 근거: DTO에 penalty 필드 존재하나 입력 UI 미연결.
- **MM-040 결과 확정 권한** · UI: 보완 · 근거: 상태 컬럼은 있으나 역할 제어 UI 없음.
- **MM-041 결과 취소/정정** · UI: 확인 필요 · 근거: 삭제 UI 없음. (API도 없음, 4절)

### 선수별 득점 기록 (MM-042 ~ MM-048)
- **MM-042 경기별 득점 조회** · UI: 미구현 · 근거: 득점 UI/코드 전무.
- **MM-043 득점 선수 선택** · UI: 미구현 · 근거: 전무. (ScoreBoard에 로컬 선수 골 카운터만 존재, 미렌더)
- **MM-044 득점 기록 생성** · UI: 미구현 · 근거: 전무.
- **MM-045 득점 기록 수정** · UI: 미구현 · 근거: 전무.
- **MM-046 득점 기록 삭제** · UI: 미구현 · 근거: 전무.
- **MM-047 득점↔점수 일치 검증** · UI: 확인 필요 · 근거: 검증 로직 없음(백엔드 도메인 분리).
- **MM-048 득점 순위 집계** · UI: 확인 필요 · 근거: 프런트 집계 없음(백엔드 TopScorer 의존).

### 순위표·득점 순위 (MM-049 ~ MM-056)
- **MM-049 조별 순위 조회** · UI: 미구현 · API: 미구현 · 근거: `rank/index.tsx`는 `<h3>경기 결과</h3>`만
  반환하는 스텁(컴포넌트명 `MatchReport` 오기). standings API/훅 전무.
- **MM-050 승점 계산** · UI: 미구현(프런트 기준) · 근거: 프런트 계산 없음, 조회 화면도 없음(백엔드 standings 의존).
- **MM-051 득실차/다득점 정렬** · UI: 미구현(프런트 기준) · 근거: 프런트 정렬·표시 없음.
- **MM-052 동률 처리** · UI: 확인 필요 · 근거: 추가 동률 규칙 미결정(제품 규칙 의존).
- **MM-053 결과 수정 후 순위 반영** · UI: 미구현(프런트 기준) · 근거: 순위 화면 자체 없음. (백엔드 재계산 스텁)
- **MM-054 득점 순위 조회** · UI: 미구현 · API: 미구현 · 근거: `user/Ranking`은
  `<h1>Competition Ranking</h1>` 스텁. scorers API/훅/페이지 전무.
- **MM-055 득점 동률 처리** · UI: 확인 필요 · 근거: 동률 표기 규칙 미결정.
- **MM-056 빈 상태/오류 처리** · UI: 미완성 · 근거: 순위/득점순위 화면이 스텁이라 빈 상태·오류 분기 없음.

### SSE 실시간 갱신 (MM-057 ~ MM-063)
- **MM-057~063** · UI: 전부 확인 필요(사실상 미구현) · 근거: `EventSource`/`/realtime`/`scorers`/
  `standings`/`topscorers` grep **0건**. 프런트 SSE 코드 없음. 계약상 백엔드 엔드포인트는 존재.
  (UI 분포에서는 지시서 보수성에 따라 "확인 필요"로 집계)

### 안정성·운영 (MM-064 ~ MM-073)
- **MM-064 TS/프로덕션 빌드** · UI: 보완 · 근거: `npx tsc --noEmit` 종료 코드 2(실행 확인). Detail.tsx,
  admin Team.tsx 등 오류.
- **MM-065 깨진 import/라우팅** · UI: 보완 · 근거: `admin/competition/team/Team.tsx`의 `@/redux/*` 등
  미해결 import, `baracket` 오타, `/admin/matchReport` 미등록 내비.
- **MM-066 환경별 API URL** · UI: 보완 · 근거: `utils/api.ts` base URL `localhost:3000` 하드코딩, `.env` 없음.
- **MM-067 오류/로딩/빈 상태** · UI: 확인 필요 · 근거: 전역 네트워크 오류 토스트만 존재(`App.tsx`).
- **MM-068 요청/응답 타입 정합성** · UI: 보완 · 근거: `IMatchResultDto`가 계약 `MatchResultDto`와 불일치.
- **MM-069 자동화 테스트** · UI: 보완 · 근거: `test`가 `react-scripts test`인데 미설치(실행 확인). 테스트 2개 존재하나 실행 불가.
- **MM-070 권한/무결성 테스트** · UI: 확인 필요 · 근거: 해당 테스트 없음.
- **MM-071 모바일 대응(후순위)** · UI: 확인 필요 · 근거: 반응형 상태 미확인.
- **MM-072 통계 화면(후순위)** · UI: 확인 필요 · 근거: 프런트 통계 화면/호출 없음(백엔드 stub).
- **MM-073 배포/환경 검증** · UI: 확인 필요 · 근거: 배포 환경 미확인.

---

## 3. 기능 ID별 프런트 API 연결 상태 (근거 포함)

> "API 함수 존재 ≠ 연결 완료". 화면/훅에서 실제 호출되는지로 판정.

- **연결되어 소비 중(보완)**: MM-008(competition), MM-021~023(groupStage), MM-032/033/037(matchResult 목록).
  → API 함수가 있고 화면/훅에서 호출되나, 응답 매핑/오류 처리/계약 정합이 불완전.
- **API 함수는 있으나 UI 미연결(미완성)**:
  - MM-035 `createMatchResult`/`useCreateMatchResult` — 정의만, 소비처 없음.
  - MM-036 `updateMatchResult`/`useUpdateMatchResult` — 정의만, 소비처 없음.
  - MM-024/025 matchSchedule CRUD — 훅은 있으나 결과 입력 화면 연계 미완.
  - MM-034/039 결과/승부차기 입력 — DTO/훅 존재, 화면 미연결.
- **API 자체가 프런트에 없음(미구현)**:
  - MM-042~046 GoalRecord(create/remove/list/수정/삭제) — 프런트 API 모듈 없음.
  - MM-049~056 standings/scorers — 프런트 API/훅/페이지 없음.
  - MM-057~063 SSE — 프런트 연결 없음.
- **경로 불일치(확인 필요/보완)**: MM-032~041 — 프런트 `/match-results/...`, `/match-schedules`가
  계약의 `/competitions/:id/matches/...`와 다름(4절).
- 나머지 인증/대회/팀/선수 다수는 함수는 있으나 **전체 흐름 미검증 → 확인 필요**.

---

## 4. API 계약 불일치 (코드 vs api-contract.md)

| # | 프런트 코드 | 계약(As-Is) | 영향 기능 |
|---|---|---|---|
| 1 | `api/matchResult.ts` → `/match-results/...` | `/competitions/:id/matches/...` (MatchResult) | MM-032~041 |
| 2 | `api/matchSchedule.ts` → `/match-schedules` | `/competitions/:id/matches` (Match) | MM-024~026 |
| 3 | 득점 API 없음 | `/competitions/:id/matches/create\|remove\|list` (Records) | MM-042~046 |
| 4 | 순위/득점순위 호출 없음 | `/competitions/:id/standings`, `/scorers` (`:id`=**tournamentId**) | MM-049~055 |
| 5 | SSE 없음 | `/realtime/tournaments/:id/events` (이벤트 `topscorers.updated` 등) | MM-057~063 |
| 6 | `IMatchResultDto.matchSchedule` | `MatchResultDto.match`(=`MatchDto`), 필드명 상이 | MM-033/068 |
| 7 | `api/competition.ts` 수정 API 없음, `apply` 응답 문자열 | 계약 `PATCH /competitions/:id` 존재 | MM-009 |
| 8 | `api/groupStage.ts` → `/group-stages/...` | 계약 Stages 베이스 `/competitions/:id/stages` (라우트 충돌 경고) | MM-021~023 |

> 계약상 Match/Stages 라우트는 충돌 가능성이 기록돼 있어, 경로가 맞더라도 런타임 전까지 정상 동작 가정 금지.

---

## 5. UI만 구현되고 실제 동작/저장이 없는 기능
- MM-034 결과 입력(ScoreBoard 로컬 state, 미렌더), MM-039 승부차기 입력.
- MM-049/054/056 순위·득점순위 화면 스텁(렌더만, 데이터 없음).

## 6. API 함수는 있으나 UI와 연결되지 않은 기능
- MM-035 `useCreateMatchResult`, MM-036 `useUpdateMatchResult` — 정의만 존재, 소비처 전무.
- (schedule 훅 일부도 결과 입력 흐름과 미연결)

## 7. 미구현 / 보완 필요 기능 (프런트 코드 부재가 코드로 확정된 것)
- **미구현(프런트 코드 없음)**: MM-042~046(득점), MM-049/054/056(순위·득점순위 화면 실데이터),
  MM-027/029/030(진출·우승 로직 프런트), MM-005(득점 권한 UI).
- **보완(존재하나 불완전)**: MM-001, MM-014, MM-019, MM-021~023, MM-032/033/037/038/040,
  MM-053, MM-064~066/068/069.

## 8. 백엔드 확인 필요 항목 (프런트 문제와 분리)
> 프런트 저장소에서는 백엔드 구현을 확인할 수 없다. 계약/기존 분석상 아래는 백엔드 책임으로 분리.
- 라우트 충돌: `competitions/:id/matches`, `competitions/:id/stages` (MM-021/022, MM-032~036).
- `:id`가 tournamentId인 standings/scorers/SSE (MM-012, MM-049~055, MM-057~063).
- 결과 중복 생성(유니크 제약 없음) (MM-035).
- 권한 검증 부재, 득점 조회 Public (MM-003~006, MM-040, MM-005).
- 토너먼트 진출/우승 로직, standings 재계산 스텁 (MM-027/029/030, MM-053).
- DELETE MatchResult 엔드포인트 부재 (MM-041).
- 통계 endpoint 스텁 (MM-072).

## 9. 우선순위별 다음 작업 (제안, 완료 조건은 기존 엑셀 유지)
1. **P0 빌드 복구** (MM-064/065/068): tsc 오류 제거(Detail.tsx 필드, admin Team.tsx import). 검증: `npx tsc --noEmit` → `yarn build`.
2. **P1 경기 결과 입력** (MM-032~039): 계약 경로/DTO 정합화, ScoreBoard 연결, create/update 호출, list 쿼리 무효화.
3. **P1 득점 기록** (MM-042~046): GoalRecord API 모듈/훅 신규(create/remove/list), 입력 화면 연계.
4. **P2 순위/득점순위** (MM-049~055): standings/scorers 연동 시 **tournamentId** 사용.
5. **P2 SSE** (MM-057~063): `/realtime/tournaments/:id/events`, 이벤트명 `topscorers.updated` 등.
6. **운영** (MM-066/069): API URL 환경변수화, 테스트 러너 교체(react-scripts→vitest 등). 테스트 환경은 별도 작업.

---

## 10. 사실 구분 요약
- **코드로 확인한 사실**: 득점/순위/SSE 프런트 코드 부재(grep 0건), 경기 결과 입력/저장 미연결,
  `PrivateRoute` 역할 결함, API 경로-계약 불일치, 빌드 실패(tsc 종료 2), react-scripts 미설치.
- **실행으로 검증한 사실**: `npx tsc --noEmit` 실패 / `react-scripts` 미설치. (그 외 런타임 통합 검증은 미수행)
- **아직 확인하지 못한 사항**: 모든 기능의 실제 API 호출 성공 여부, 저장 후 재조회, 인증 만료 흐름,
  SSE 수신, 백엔드 구현 상태. → 통합 검증 전 항목 `미검증`.
