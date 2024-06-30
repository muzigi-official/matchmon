import { ReactNode } from 'react';
import { StyledButton } from './Button.styles';

type ButtonProps = {
  children: ReactNode;
  variant?: TButtonVariant;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export default function Button({ children, disabled, variant = 'contained', selected, onClick }: ButtonProps) {
  return (
    <StyledButton disabled={disabled} variant={variant} selected={selected} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
