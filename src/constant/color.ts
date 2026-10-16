// 색상 밝기(luminance) 계산 상수
// 참고: ITU-R BT.601 가중치 기반 밝기 공식 (R*299 + G*587 + B*114) / 1000

export const LUMINANCE_WEIGHT = {
  R: 299,
  G: 587,
  B: 114,
} as const;

export const LUMINANCE_DIVISOR = 1000;

// 밝기 임계값: getBrightness(0~255)가 이 값보다 크면 밝은 배경 → 어두운 글자 사용
export const BRIGHTNESS_THRESHOLD = 128;

// 버튼 hover 시 배경을 어둡게 만드는 양(darkenColor amount)
export const HOVER_DARKEN_AMOUNT = 20;

// 버튼 hover 시 배경 투명도(outlined/text variant)
export const HOVER_BG_OPACITY = 0.1;
