// 색상 밝기(luminance) 계산 상수
// 참고: ITU-R BT.601 가중치 기반 밝기 공식 (R*299 + G*587 + B*114) / 1000

export const LUMINANCE_WEIGHT = {
  R: 299,
  G: 587,
  B: 114,
} as const;

export const LUMINANCE_DIVISOR = 1000;
