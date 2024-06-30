import { ReactNode } from 'react';
import { StyledButton } from './Button.styles';

type ButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: TButtonVariant;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export default function Button({
  children,
  type = 'button',
  disabled,
  variant = 'contained',
  selected,
  onClick,
}: ButtonProps) {
  return (
    <StyledButton type={type} disabled={disabled} variant={variant} selected={selected} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
