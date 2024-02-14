import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

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
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={onClickMenu}
          edge='start'
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Button variant='outlined' color='primary'>
          Login
        </Button>
      </S.Toolbar>
    </S.AppBar>
  );
}
