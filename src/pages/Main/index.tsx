import React from 'react';

import type { RootState } from '@/redux/store';
import { logIn, logOut } from '@/redux/module/user';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { Button } from '@mui/material';

export default function Main() {
  const isSignIn = useAppSelector((state: RootState) => state.user.isSignIn);
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(logIn('sampleAuthToken'));
  };
  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <>
      {isSignIn ? (
        <Button variant='outlined' onClick={handleLogout}>
          로그아웃
        </Button>
      ) : (
        <Button variant='outlined' onClick={handleLogin}>
          로그인
        </Button>
      )}
    </>
  );
}
