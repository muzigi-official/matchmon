import styled, { css } from 'styled-components';

import { BRIGHTNESS_THRESHOLD, HOVER_DARKEN_AMOUNT, HOVER_BG_OPACITY } from '@/constant/color';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { darkenColor, getBrightness, getCustomColor, getRgbaColor } from '@/utils/color.ts';

// props를 DOM에 직접 전달하지 않도록 해야 되기 때문에 transient props를 사용.
// Transient props는 $ 접두사를 사용하여 props가 DOM 요소에 전달되지 않도록 한다.

const buttonStyles = {
  contained: css<{ $color?: string }>`
    background-color: ${({ $color }) => getCustomColor($color)};
    color: ${({ $color }) =>
      getBrightness(getCustomColor($color)) > BRIGHTNESS_THRESHOLD ? colors.black : colors.white};
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
    width: 36px;
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
  border-radius: 4px;
  padding: 0.5em 0.8em;
  font-size: ${typography.body.fontSize};
  font-weight: ${typography.body.fontWeight};
  font-family: ${typography.fontFamily};
  cursor: pointer;
  transition: background-color 0.25s;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 36px;

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
