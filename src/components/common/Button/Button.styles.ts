import styled, { css } from 'styled-components';

import { BRIGHTNESS_THRESHOLD, HOVER_DARKEN_AMOUNT, HOVER_BG_OPACITY } from '@/constant/color';
import { colors } from '@/styles/colors';
import { radius, shadow } from '@/styles/tokens';
import { typography } from '@/styles/typography';
import { darkenColor, getBrightness, getCustomColor, getRgbaColor } from '@/utils/color.ts';

// props를 DOM에 직접 전달하지 않도록 해야 되기 때문에 transient props를 사용.
// Transient props는 $ 접두사를 사용하여 props가 DOM 요소에 전달되지 않도록 한다.

const buttonStyles = {
  contained: css<{ $color?: string }>`
    background-color: ${({ $color }) => getCustomColor($color)};
    color: ${({ $color }) =>
      getBrightness(getCustomColor($color)) > BRIGHTNESS_THRESHOLD ? colors.black : colors.white};
    box-shadow: ${shadow.sm};
  `,
  outlined: css<{ $color?: string }>`
    background-color: inherit;
    border: 1px solid ${({ $color }) => getCustomColor($color)};
    color: ${({ $color }) => getCustomColor($color)};
  `,
  text: css<{ $color?: string }>`
    background-color: inherit;
    border: none;
    color: ${({ $color }) => getCustomColor($color)};
  `,
  fab: css<{ $color?: string }>`
    background-color: inherit;
    border: 1px solid ${({ $color }) => getCustomColor($color)};
    color: ${({ $color }) => getCustomColor($color)};
    width: 48px;
    padding: 0;
    border-radius: 50%;
  `,
};

export const StyledButton = styled.button<{
  $variant: TButtonVariant;
  $selected?: boolean;
  $color?: string;
  $block?: boolean;
}>`
  border-radius: ${radius.md};
  padding: 0 18px;
  font-size: ${typography.body.fontSize};
  font-weight: 600;
  font-family: ${typography.fontFamily};
  cursor: pointer;
  transition: background-color 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 48px;

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  ${({ $variant }) => buttonStyles[$variant]}

  ${({ $block }) =>
    $block &&
    css`
      display: block;
      width: 100%;
    `}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:hover:not(:disabled) {
    background-color: ${({ $variant, $color }) =>
      $variant === 'contained'
        ? darkenColor(getCustomColor($color), HOVER_DARKEN_AMOUNT)
        : getRgbaColor(getCustomColor($color), HOVER_BG_OPACITY)};
    border-color: ${({ $variant, $color }) =>
      $variant === 'outlined' && darkenColor(getCustomColor($color), HOVER_DARKEN_AMOUNT)};
    color: ${({ $variant, $color }) => $variant !== 'contained' && getCustomColor($color)};
  }

  ${({ $selected }) =>
    $selected &&
    css`
      background-color: ${colors.primary};
      color: ${colors.white};
    `}
`;
