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
    case 'danger':
      return colors.danger;
    case 'cancel':
      return colors.cancel;
    default:
      return color || colors.primary;
  }
};
