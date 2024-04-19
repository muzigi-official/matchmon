import { ReactNode } from 'react';

import styles from './Button.module.css';

type ButtonProps = {
  children: ReactNode;
  variant?: 'text' | 'contained' | 'outlined' | undefined;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export default function Button({ children, disabled, variant = 'contained', selected, onClick }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={[styles.button, selected ? styles.selected: '', variant ? styles[variant]: ''].join(' ')}
      onClick={onClick}>
      {children}
    </button>
  );
}
