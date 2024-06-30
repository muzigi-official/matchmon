import styled, { css } from 'styled-components';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { darkenColor, getBrightness } from '@/utils/color.ts';

const buttonStyles = {
  contained: css<{ color?: string }>`
    background-color: ${({ color }) => color || colors.primary};
    color: ${({ color }) => (getBrightness(color || colors.primary) > 128 ? colors.darkText : colors.whiteText)};
  `,
  outlined: css<{ color?: string }>`
    background-color: inherit;
    border: 1px solid ${({ color }) => color || colors.primary};
    color: ${({ color }) => color || colors.primary};
  `,
  text: css<{ color?: string }>`
    background-color: inherit;
    border: none;
    color: ${({ color }) => color || colors.primary};
  `,
};

type ButtonVariant = 'text' | 'contained' | 'outlined';

export const StyledButton = styled.button<{ variant: ButtonVariant; selected?: boolean; color?: string }>`
  border-radius: 8px;
  padding: 0.5em 0.8em;
  font-size: ${typography.body.fontSize};
  font-weight: ${typography.body.fontWeight};
  font-family: ${typography.fontFamily};
  cursor: pointer;
  transition: background-color 0.25s;

  ${({ variant }) => buttonStyles[variant]}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:hover:not(:disabled) {
    background-color: ${({ variant, color }) =>
      variant === 'contained' ? darkenColor(color || colors.primary, 20) : 'rgba(0, 0, 0, 0.1)'};
    border-color: ${({ variant, color }) => variant === 'outlined' && darkenColor(color || colors.primary, 20)};
    color: ${({ variant, color }) => variant !== 'contained' && (color || colors.primary)};
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${colors.primary};
      color: ${colors.whiteText};
    `}
`;
