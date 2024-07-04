import { ReactNode } from 'react';
import { StyledButton } from './Button.styles';

type ButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: TButtonVariant;
  color?: string;
  selected?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  block?: boolean;
  onClick?: () => void;
};

export default function Button({
  children,
  type = 'button',
  variant = 'contained',
  color,
  block,
  disabled,
  selected,
  autoFocus = false,
  onClick,
}: ButtonProps) {
  return (
    <StyledButton
      type={type}
      disabled={disabled}
      variant={variant}
      color={color}
      block={block}
      selected={selected}
      autoFocus={autoFocus}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}
