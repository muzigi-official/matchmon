// typography.ts
// Pretendard 우선, 시스템 폰트 폴백. (CDN은 index.html에서 로드)
const fontFamily =
  'Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Segoe UI", Roboto, "Noto Sans KR", sans-serif';

export const typography = {
  fontFamily,
  heading1: {
    fontSize: '28px',
    fontWeight: '800',
    lineHeight: '1.3',
    letterSpacing: '-0.02em',
  },
  heading2: {
    fontSize: '22px',
    fontWeight: '700',
    lineHeight: '1.35',
    letterSpacing: '-0.01em',
  },
  heading3: {
    fontSize: '18px',
    fontWeight: '700',
    lineHeight: '1.4',
  },
  body: {
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '1.6',
  },
  bodyStrong: {
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '1.6',
  },
  caption: {
    fontSize: '13px',
    fontWeight: '400',
    lineHeight: '1.5',
  },
};
