# MatchMon · 프로젝트 구조 (structure)

> 실제 `src` 디렉터리와 파일 경로를 확인해 정리한다. 존재하는 경로만 기록한다.

## 1. 최상위
```
src/
  App.tsx            # QueryClientProvider, ThemeProvider, RouterProvider, Toaster 구성
  main.tsx           # 엔트리
  api/               # axios 기반 API 함수
  auth/              # AuthService (signIn/signUp/getMe)
  components/        # 공통/도메인 컴포넌트
  constant/          # 상수 (Navigation 등)
  hooks/queries/     # react-query 훅
  queryKeys/         # react-query 쿼리 키 팩토리
  pages/             # 라우트별 페이지
  providers/         # ClickOutsideProvider 등
  router/            # 라우터 정의, 보호 라우트, 내비 경로
  store/             # Zustand 스토어
  styles/ theme/     # 전역 스타일 / MUI 테마
  types/             # 전역 타입 선언 (global.d.ts)
  utils/             # api 인스턴스 등
  plugins/ Mocks/    # 보조
```

## 2. 라우트 / 페이지 (`src/router/index.tsx`)
`createBrowserRouter` + lazy import. 모든 보호 라우트는 `PrivateRoute roles={[...]}`로 감싼다.

- 공용/일반 유저: `main`, `team`, `results`(= `pages/user/Competition/Result`), `bracket`,
  `competitions`, `competitions/:competitionId`
- `admin/*` (role: `admin`): `competitions`, `competitions/:compId`, `users`, `players`, `teams`
- `competition/*` (role: `competitionUser`): `list`, `participateTeams`,
  `participateTeams/:joinCompId`, `participateTeams/matching`, `baracket`,
  `results`(경기 결과 목록), `results/:matchId`(경기 결과 입력), `rank`
- `/login`

페이지 디렉터리:
```
pages/
  Main/ login/
  user/        Competition/ Bracket/ Ranking/ team/ Home.tsx
  admin/       competition/ players/ teams/ users/ Home.tsx
  competitionUser/ competition/ matching/ bracket/ matchReport/ rank/ team/ Home.tsx
```

### 라우트 관련 알려진 불일치 (코드로 확인)
- 내비(`router/path.tsx`)의 `/admin/matchReport`는 **라우터에 등록된 경로가 없음** (끊긴 링크).
- `competition/baracket` — `bracket` 오타로 추정.
- 내비의 `/player`, `/ranking`과 실제 라우트(`/team` 등) 경로가 일부 어긋남.

## 3. 공통 컴포넌트 (`src/components`)
```
components/
  common/   Button/ Select/ Pagination/ Tabs/ DateTimePicker/ Loading/   # 대부분 Storybook 포함
  mui/      table/DataTable 등 MUI 래퍼
  layout/   Main 레이아웃, BreadCrumbs 등
  competition/ team/ tournament/   # 도메인 컴포넌트
  test/     Dropdown.test.tsx       # 테스트(현재 러너 미동작)
```
재사용 우선 대상: `common/*`의 Button, Select(BasicSelect/FormSelect), Pagination, Tabs,
DateTimePicker, Loading과 `mui/table/DataTable`.

## 4. API 함수 (`src/api`) + 요청 설정
- `competition.ts`, `team.ts`, `player.ts`, `tournament.ts`, `groupStage.ts`,
  `matchSchedule.ts`, `matchSetting.ts`, `matchResult.ts`, `joinTeamComps.ts`, `loginChecker.ts`
- 모든 요청은 `src/utils/api.ts`의 `requestAPI`(axios) 인스턴스를 거친다.
- 경기 결과 API(`matchResult.ts`): `GET /match-results/{scheduleId}/result`,
  `GET /match-results/competition/{competitionId}/results`, `POST /match-results`,
  `PUT /match-results/{scheduleId}`. **삭제(DELETE) 없음.**

## 5. react-query 훅 / 쿼리 키
```
hooks/queries/   useCompetitionQuery, useGroupstageQuery, useJoinCompTeamQuery,
                 useMatchResultQuery, useMatchScheduleQuery, useMatchSettingQuery,
                 usePlayerQuery, useTeamQuery
queryKeys/       competitionQueryKey, groupstage, joinTeamCompsQueryKeys, matchResult,
                 matchSchedule, matchSetting, playerQueryKeys, teamQueryKeys
```
- `matchResultQueryKeys = { result(scheduleId) → ['matchResult', id], list(competitionId) → ['matchResultList', id] }`
- `useMatchResultQuery.ts`: `useMatchResult`, `useMatchResultsList`, `useCreateMatchResult`,
  `useUpdateMatchResult`. 생성/수정 훅은 **정의만 되어 있고 소비처 없음**. 두 뮤테이션 모두
  `result` 키만 무효화하고 `list` 키는 무효화하지 않음.

## 6. 전역 상태 (`src/store`, Zustand)
- `useCompetitionStore.ts` — 선택된 대회 등 (`selectedCompetition`), `persist` 사용
- `useUserStore.ts` — 사용자 정보, `getMe` 연동, `persist`/`devtools` 사용
- (Redux는 `src`에서 사용처 미확인 — `tech.md` 3절 참고)

## 7. 타입 선언 (`src/types`)
- 전역 ambient 선언 `global.d.ts`에 도메인 타입 집중:
  `IMatchResultDto`, `IMatchScheduleDto`, `IMatchSchedule`, `TMatchResult`
  (`'HOME_WIN' | 'AWAY_WIN' | 'DRAW'`), `TMatchResultState`
  (`'COMPLETED' | 'PENDING_RESULT' | 'WAITING'`), `ICompetition`, `IPlayer`, `IUser` 등.
- `IMatchResultDto`는 집계 점수(`homeScore`/`awayScore`)만 가지며 **선수별 득점(GoalRecord) 필드 없음.**
- 선수별 득점 구조 `IResultPlayer`는 `ScoreBoard.tsx` 내부 로컬 타입으로만 존재.

## 8. 경기 결과 데이터 흐름 (현재)
- **목록(완성)**: `useCompetitionStore.selectedCompetition` → `useMatchResultsList(competitionId)`
  → `GET /match-results/competition/{id}/results` → `matchReport/index.tsx` 테이블 →
  행 클릭 시 `/competition/results/{id}` 이동.
- **입력(미완)**: `matchReport/Detail.tsx` → 잘못된 필드 접근으로 선택 경기 미탐색,
  `ScoreBoard` 렌더/저장 로직 주석 처리, 저장 뮤테이션 미호출 → 아무것도 저장되지 않음.

## 9. 재사용 가능 / 미완성 요약
- 재사용 가능: `src/api/matchResult.ts` 4개 함수, `useMatchResultQuery.ts`의 훅들,
  `matchResultQueryKeys`, `matchReport/index.tsx`(목록), `ScoreBoard.tsx`(입력 UI 뼈대),
  `useParticipatePlayersQuery`(선수 조회), `common/*` 공통 컴포넌트.
- 미완성/미연결: `Detail.tsx`(입력), `ScoreBoard`(고아), 생성/수정 훅(미사용),
  `rank`·`user/Ranking`(스텁), 순위/득점 랭킹 전반, 경기 결과 삭제.
