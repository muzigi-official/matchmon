# 매치몬(matchmon) 개발 상태 리포트

> 작성일: 2026-10-14 · 기준 브랜치: `feature/#60`

## 1. 프로젝트 개요

아마추어 스포츠 **대회 관리 플랫폼**. 팀·선수 등록, 대회 생성 및 참가, 대진표, 경기 기록, 랭킹을 다룬다.

## 2. 기술 스택

| 구분 | 사용 기술 |
|------|-----------|
| 프레임워크 | React 18 + TypeScript + Vite (plugin-react-swc) |
| 상태 관리 | Zustand, Redux Toolkit, react-query v3 (혼용) |
| UI | MUI v5, Emotion, styled-components |
| 폼 / 유틸 | react-hook-form, dayjs, axios, lodash, react-hot-toast |
| 개발 도구 | Storybook 7, ESLint, Prettier, Yarn (berry) |

## 3. 권한 구조 (3-Role)

라우터가 역할별로 분리되어 있다.

- **일반 유저 (NU)**: 팀 / 선수 / 대회 조회 / 랭킹 / 대진표 — `/team`, `/competitions`, `/player`, `/ranking`, `/bracket`
- **대회 관리자 (CA / competitionUser)**: 참가팀 관리, 매칭, 대진표, 경기기록 입력, 랭킹 — `/competition/*`
- **개발자 / admin**: 대회·유저·팀·선수 전체 관리 — `/admin/*`

> 대회 생성 권한은 일반 유저에게 없음. 참가비 등의 이유로 대회 관리자 계정에서만 생성 가능.

## 4. 구현 현황

| 영역 | 상태 |
|------|------|
| 라우팅 + 역할 기반 보호 (`PrivateRoute`, `ProtectedLayout`) | 구축 완료 |
| API 레이어 (competition, team, player, tournament, matchResult, groupStage, matchSchedule, matchSetting, joinTeamComps, loginChecker) | 10개 모듈 구성됨 |
| 공통 컴포넌트 (Button, Select, Pagination, Tabs, DateTimePicker, Loading) | Storybook 포함 구현 |
| 대회 관리자 플로우 (참가팀 / 매칭 / 대진표 / 경기기록 / 랭킹) | 활발히 개발 중 |
| 인증 (AuthService, 쿠키 기반) | 구현됨 |

## 5. 현재 작업 지점

- 현재 브랜치: **`feature/#60`** — origin보다 로컬 커밋 5개 앞섬 (미push)
- 최근 커밋 초점: 경기 결과(matchResult) API / 쿼리키 / 훅 추가, ESLint 설정 정리
- 미커밋 변경: `src/pages/Main/index.tsx`, `src/router/path.tsx`

## 6. 이슈 및 개선 포인트

1. **상태 관리 라이브러리 중복** — Zustand, Redux, react-query 공존. 역할 정리 필요.
2. **라우트 경로 불일치**
   - `path.tsx`의 `/player` ↔ 실제 라우터 `/players`
   - `path.tsx`의 `/ranking` ↔ 실제 `rank`
   - `baracket` → `bracket` 오타로 추정
3. **테스트 설정 불일치** — `react-scripts test` (CRA 잔재)로 설정되어 있으나 Vite 프로젝트라 동작하지 않을 가능성 높음.
4. **API 연동 안정화 단계** — FIXME/TODO 주석과 "데이터가 안 넘어오는 것처럼 보였던" 버그 수정 흔적 존재.

## 7. 종합 판단

MVP 기능 골격은 완성됐고, **대회 관리자 측 경기 기록 / 랭킹 플로우를 다듬는 단계**로 보인다. 다음 우선순위 후보는 라우트 경로 정합성 정리, 상태 관리 전략 통일, 테스트 환경 정상화다.
