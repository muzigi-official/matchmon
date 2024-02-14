import * as React from 'react';
import { Avatar, Button } from '@mui/material';

interface AppBarProps {
  open: boolean;
  onClickMenu: () => void;
}

import * as S from './Main.style';

export default function VerticalLayoutHeader(props: AppBarProps) {
  const { open, onClickMenu } = props;
  console.log(open);
  return (
    <S.AppBar position='fixed' color='inherit' open={open}>
      <S.Toolbar open={open}>
        <Avatar
          src='logo.png'
          aria-label='open drawer'
          onClick={onClickMenu}
          sx={{
            marginRight: 5,
            cursor: 'pointer',
            ...(open && { display: 'none' }),
          }}
        />
        <Button variant='outlined' color='primary'>
          Login
        </Button>
      </S.Toolbar>
    </S.AppBar>
  );
}
