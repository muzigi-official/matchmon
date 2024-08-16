import { colors } from '@/styles/colors';

export const darkenColor = (color: string, amount: number) => {
  const [r, g, b] = color.match(/\w\w/g)!.map(c => parseInt(c, 16));
  return `rgb(${Math.max(0, r - amount)}, ${Math.max(0, g - amount)}, ${Math.max(0, b - amount)})`;
};

export const getBrightness = (color: string) => {
  const [r, g, b] = color.match(/\w\w/g)!.map(c => parseInt(c, 16));
  return (r * 299 + g * 587 + b * 114) / 1000;
};

export const getCustomColor = (color?: string) => {
  switch (color) {
    case 'primary':
      return colors.primary;
    case 'error':
      return colors.error.default;
    case 'warning':
      return colors.warning.default;
    case 'success':
      return colors.success.default;
    case 'info':
      return colors.info.default;
    case 'cancel':
    case 'default':
      return colors.cancel.default;
    default:
      return color || colors.primary;
  }
};

export const hexToRgb = (hex: string) => {
  let r = 0,
    g = 0,
    b = 0;
  // 3자리 hex 코드일 경우
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  }
  // 6자리 hex 코드일 경우
  else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return { r, g, b };
};

export const getRgbaColor = (hex: string, opacity: number) => {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
