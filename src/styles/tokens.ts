// tokens.ts
// 간격 / 모서리 / 그림자 디자인 토큰 (8pt 기반)

// 모서리 둥글기 — 둥글수록 친근/모던
export const radius = {
  sm: '8px',
  md: '12px', // 기본 (버튼/인풋/카드)
  lg: '16px', // 큰 카드
  full: '9999px', // pill (뱃지/칩)
};

// 간격 — 8pt 스케일
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
};

// 그림자 — 입체감으로 "누르는 곳" 명확히
export const shadow = {
  sm: '0 1px 2px rgba(15, 23, 42, 0.06)',
  md: '0 4px 12px rgba(15, 23, 42, 0.08)',
  lg: '0 8px 24px rgba(15, 23, 42, 0.10)',
  // 핵심 버튼용 primary 글로우
  primary: '0 4px 12px rgba(37, 99, 235, 0.30)',
};

// 공통 트랜지션
export const transition = {
  base: '0.2s ease',
};
