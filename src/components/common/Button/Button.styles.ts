import styled, { css } from 'styled-components';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

const buttonStyles = {
  contained: css`
    background-color: ${colors.primary};
    color: ${colors.whiteText};
  `,
  outlined: css`
    background-color: inherit;
    border: 1px solid ${colors.primary};
    color: ${colors.primary};
  `,
  text: css`
    background-color: inherit;
    border: none;
    color: ${colors.primary};
  `,
};

const darkenColor = (color: string, amount: number) => {
  const [r, g, b] = color.match(/\w\w/g)!.map(c => parseInt(c, 16));
  return `rgb(${Math.max(0, r - amount)}, ${Math.max(0, g - amount)}, ${Math.max(0, b - amount)})`;
};

type TButtonVariant = 'text' | 'contained' | 'outlined';

export const StyledButton = styled.button<{ variant: TButtonVariant; selected?: boolean }>`
  border-radius: 4px;
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
    background-color: ${({ variant }) =>
      variant === 'contained'
        ? darkenColor(colors.primary, 20)
        : variant === 'outlined'
          ? 'rgba(0, 0, 0, 0.1)'
          : 'rgba(0, 0, 0, 0.1)'};
    border-color: ${({ variant }) => variant === 'outlined' && darkenColor(colors.primary, 20)};
    color: ${({ variant }) => (variant === 'contained' ? colors.whiteText : colors.primary)};
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${darkenColor(colors.primary, 40)};
      color: ${colors.whiteText};
    `}
`;
