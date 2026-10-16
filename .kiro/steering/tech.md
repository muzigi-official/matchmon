---
inclusion: fileMatch
fileMatchPattern:
  - 'src/**/*.ts'
  - 'src/**/*.tsx'
---

# MatchMon · 기술 스택 (tech)

> `package.json`, `vite.config.ts`, `.npmrc`, 실제 `src` 코드로 확인한 사실만 기록한다.
> `package.json`에 선언됐더라도 코드에서 사용이 확인되지 않으면 "사용 중"으로 단정하지 않는다.

## 1. 프레임워크 / 언어
- React 18 (`react` ^18.2.0) + TypeScript (`typescript` ^5.2.2)
- Vite 5 (`vite` ^5.0.8), 플러그인: `@vitejs/plugin-react-swc`, `vite-tsconfig-paths`
  - `vite.config.ts`에서 경로 별칭(`@` → `/src` 등)과 `@mui/styled-engine` → `@mui/styled-engine-sc` alias 설정

## 2. 패키지 매니저
- **pnpm 9.15.2** (`package.json` → `"packageManager": "pnpm@9.15.2"`, 락파일 `pnpm-lock.yaml`)
  - `.npmrc` → `node-linker=hoisted` (MUI/Emotion/styled-components + `@mui/styled-engine-sc` alias
    조합에서 pnpm 기본 symlink 방식의 의존성 해석 문제를 피하려고 평면 node_modules 사용)
  - (이전에는 Yarn Berry 4.3.0 `nodeLinker: node-modules` 사용 → pnpm으로 전환함)
- Node v20.x에서 동작 확인 (`node -v` → v20.20.0, 실행으로 확인)
- `node_modules` 설치 상태: 설치됨 (`pnpm install` 실행으로 확인)
- peer dependency 경고 2건(실행 영향 없음): `@vitejs/plugin-react`가 vite@4 기대(현재 5),
  `@testing-library/jest-dom`이 `@testing-library/dom`@10 기대(현재 9.3.4).

## 3. 상태 관리 — 실제 사용 현황 (중요)
- **react-query v3** (`react-query` ^3.39.3): 서버 상태 관리의 주력. `App.tsx`에서
  `QueryClientProvider`로 전역 구성(기본 `staleTime` 600초, `retry: false`,
  `refetchOnWindowFocus/Reconnect: false`, `QueryCache.onError`에서 네트워크 오류 토스트).
  `ReactQueryDevtools` 포함. 쿼리 훅은 `src/hooks/queries/*`.
- **Zustand** (`zustand` ^4.5.4): 클라이언트 전역 상태. 스토어 2개 —
  `src/store/useCompetitionStore.ts`, `src/store/useUserStore.ts` (둘 다 `persist`/`devtools` 미들웨어 사용).
- **Redux Toolkit / react-redux**: `package.json`에 선언돼 있으나 **`src`에서 사용처가 확인되지 않음**
  (`configureStore`/`createSlice`/`react-redux` import 없음). 현재 실질적으로 미사용으로 보인다.
  → 신규 전역 상태는 임의로 Redux를 도입하지 말고, 기존 Zustand/react-query 사용 여부를 먼저 확인한다.

> 참고: `src/pages/admin/competition/team/Team.tsx`가 존재하지 않는 `@/redux/store`,
> `@/redux/hooks`를 import해 타입 오류를 낸다(아래 7절). Redux 잔재로 추정.

## 4. UI / 스타일
- MUI v5 (`@mui/material`, `@mui/icons-material`, `@mui/x-date-pickers`)
- Emotion (`@emotion/react`, `@emotion/styled`) + `@mui/styled-engine-sc`
- styled-components ^6, `styled-reset`, `styled-normalize`
- 테마: `src/theme/Theme`에서 디자인 토큰 구성, `App.tsx`에서 `ThemeProvider` 적용

## 5. 폼 / 유틸 / 기타
- 폼: `react-hook-form` ^7.51
- 날짜: `dayjs` ^1.11
- HTTP: `axios` ^1.6 (`src/utils/api.ts`의 단일 인스턴스)
- 토스트: `react-hot-toast`
- 유틸: `lodash`, `ts-deepmerge`
- 라우팅: `react-router-dom` ^6 (`createBrowserRouter`, lazy import)
- 개발 도구: Storybook 7, ESLint, Prettier

## 6. 명령어 (package.json scripts, 실제 선언 확인 — pnpm 기준)
| 목적 | 명령 | 비고 |
|------|------|------|
| 설치 | `pnpm install` | 락파일 `pnpm-lock.yaml` |
| 개발 서버 | `pnpm dev` (= `vite`) | 장시간 실행 — 터미널에서 직접 실행. 기동 확인됨(localhost:5173) |
| 빌드 | `pnpm build` (= `tsc && vite build`) | **tsc 통과가 선행 조건** (현재 실패 — 7절) |
| 미리보기 | `pnpm preview` | |
| 린트 | `pnpm lint` / `pnpm lint:fix` | `lint:fix`는 파일 변경하므로 분석 시 사용 금지 |
| 포맷 | `pnpm format` | 파일 변경하므로 분석 시 사용 금지 |
| Storybook | `pnpm storybook` | 장시간 실행 |
| 테스트 | `pnpm test` (= `react-scripts test`) | **현재 동작 불가** — 아래 7절 |

## 7. 현재 확인된 기술적 문제 (실행/코드로 확인)
1. **빌드 실패**: `npx tsc --noEmit` 종료 코드 2 (실행으로 확인). 따라서 `pnpm build`도 실패.
   주요 원인:
   - `src/pages/competitionUser/matchReport/Detail.tsx`: `IMatchResultDto`에 없는 필드
     (`matchScheduleId`, `matchTime`, `homeTeamName`, `awayTeamName`) 접근.
   - `src/pages/admin/competition/team/Team.tsx`: `@/redux/store`, `@/redux/hooks`,
     `@/api/joinTeamComp`, `@/components/button/MyButton`, `@/components/table/DataTable`
     모듈 해석 실패(존재하지 않는 경로).
   - 다수의 미사용 변수/임포트(`TS6133`), 스토리북 파일 타입 오류.
2. **테스트 러너 미동작**: `test` 스크립트가 `react-scripts test`(CRA 잔재)인데
   `react-scripts`가 설치돼 있지 않다(실행으로 확인). `src/components/test/Dropdown.test.tsx`,
   `src/components/common/Pagination/Pagination.test.tsx` 테스트 파일은 존재하나 현재 실행 불가.
   `jest` 바이너리는 설치돼 있음. → 테스트 환경 정상화는 **별도 작업**으로 다룬다.
3. **API base URL 하드코딩**: `src/utils/api.ts`에서 `http://localhost:3000`으로 고정.
   환경변수(`VITE_APP_BACK_END_POINT`) 사용 줄은 주석 처리됨. `.env*` 파일 없음.

## 8. API 요청 / 인증 처리
- 단일 axios 인스턴스 `requestAPI` (`src/utils/api.ts`): `baseURL`, `timeout: 6000`,
  `Content-Type: application/json`.
- 요청 인터셉터 `checkLogin` (`src/api/loginChecker.ts`): `localStorage`의 `access_token`을
  `Authorization: Bearer ...` 헤더로 주입. (쿠키 기반 아님)
- 응답 인터셉터: `response.data`를 바로 반환하고, 오류는 `Promise.reject`.
