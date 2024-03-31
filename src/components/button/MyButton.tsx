import React, { ReactNode } from 'react';
import Button from '@mui/material/Button';

type ButtonProps = {
  children: ReactNode;
  variant?: 'text' | 'contained' | 'outlined' | undefined;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function MyButton({ children, variant, onClick }: ButtonProps) {
  return (
    <Button
      className='button'
      sx={{
        color: theme => `${variant == 'contained' ? theme.palette.primary.contrastText : theme.palette.text.primary}`,
      }}
      variant={variant}
      onClick={event => {
        if (onClick) onClick(event);
      }}
    >
      {children}
    </Button>
  );
}
