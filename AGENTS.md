# AGENTS.md

MatchMon 저장소에서 작업하는 모든 AI 코딩 도구를 위한 공통 작업 원칙이다.
상세한 기술 스택·구조·규칙은 `.kiro/steering/` 문서를 참고한다.

- 제품 개요: `.kiro/steering/product.md`
- 기술 스택: `.kiro/steering/tech.md`
- 프로젝트 구조: `.kiro/steering/structure.md`
- 개발 규칙(필독): `.kiro/steering/development-rules.md`

## 이 저장소에 대한 핵심 사실
- **프런트엔드 단독** 저장소다. 백엔드(API 서버)는 별도 저장소에 있고, 여기서는 그 HTTP 계약에
  맞춰 구현한다. 백엔드 경로·필드명을 추측하지 말고 실제 계약을 기준으로 삼는다.
- 스택: React 18 + TypeScript + Vite, Yarn Berry 4.3.0(node-modules).
- 서버 상태는 **react-query v3**, 클라이언트 전역 상태는 **Zustand**로 관리한다.
  Redux는 `package.json`에 있으나 `src`에서 사용처가 확인되지 않으므로 임의로 쓰지 않는다.

## 공통 작업 원칙
1. 구현 전에 기존 코드와 API 계약을 분석한다. 기존 API 함수·훅·타입·컴포넌트를 우선 재사용한다.
2. 요청 범위 밖의 리팩터링을 하지 않는다. 불명확하면 임의 결정하지 말고 질문한다.
3. 타입 오류는 올바른 타입으로 해결한다. 무분별한 `any`를 피한다.
4. 중복 전역 상태를 만들지 않는다. 서버 데이터와 UI 상태를 구분한다.
5. mutation 성공 후 관련 쿼리 무효화/재조회가 필요한지 검토한다.
6. Git 미커밋 변경과 미추적 파일을 보존한다. 삭제·초기화·강제 덮어쓰기는 사전 승인 후 진행한다.
7. 인증정보·개인정보(토큰, `.env` 등)를 출력하거나 문서에 남기지 않는다.
8. 변경 후 가능한 범위에서 검증한다: `npx tsc --noEmit` → `yarn build` → `yarn lint` → 관련 테스트.
   실행하지 않은 검증을 성공했다고 보고하지 않는다.

## 명령어
- 개발 서버: `yarn dev` · 빌드: `yarn build`(= `tsc && vite build`) · 린트: `yarn lint`
- 자동 수정(`yarn lint:fix`, `yarn format`)은 분석/비요청 단계에서 사용하지 않는다.

## 현재 알려진 상태 (작업 전 숙지)
- 빌드가 현재 실패 상태다(`tsc` 타입 오류 존재). 기존 오류와 내 변경으로 생긴 오류를 구분한다.
- 테스트 스크립트가 `react-scripts test`(미설치)라 현재 실행 불가 — 테스트 환경 정상화는 별도 작업.
- 경기 결과 입력 화면과 순위/득점 랭킹은 미완성이다. 자세한 내용은 steering 문서 참고.
