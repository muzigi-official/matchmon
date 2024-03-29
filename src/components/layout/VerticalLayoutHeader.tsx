import { useState } from 'react';

import { RootState } from '@/redux/store';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { logIn, logOut } from '@/redux/module/user';
import { signIn } from '@/api/auth';
import { Avatar, Button } from '@mui/material';

interface AppBarProps {
  open: boolean;
  onClickMenu: () => void;
}

import * as S from './Main.style';

export default function VerticalLayoutHeader(props: AppBarProps) {
  const dispatch = useAppDispatch();
  const isSignIn = useAppSelector((state: RootState) => state.user.isSignIn);
  const { open, onClickMenu } = props;
  const [token, setToken] = useState<string>('');
  const handleSignIn = async () => {
    const data = await signIn({ username: 'soccerCoach', password: '1q2w3e' });
    dispatch(logIn(data.access_token));
    setToken(data.access_token);
  };

  const handleSignOut = () => {
    dispatch(logOut());
    setToken('');
  };

  return (
    // TODO: TOKEN localStorage로 옮기든지 하기
    <S.AppBar position='fixed' color='inherit' open={open}>
      <S.Toolbar open={open}>
        <Avatar
          src='matchmon-logo.png'
          aria-label='main-logo-icon'
          onClick={onClickMenu}
          sx={{
            cursor: 'pointer',
            ...(open && { display: 'none' }),
          }}
        />
        토큰: {token && token.substring(0, 10)}
        {isSignIn ? (
          <Button
            variant='outlined'
            color='primary'
            onClick={() => {
              handleSignOut();
            }}
          >
            LogOut
          </Button>
        ) : (
          <Button
            variant='outlined'
            color='primary'
            onClick={() => {
              handleSignIn();
            }}
          >
            Login
          </Button>
        )}
      </S.Toolbar>
    </S.AppBar>
  );
}
