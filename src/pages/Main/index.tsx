import React, { useState, useEffect } from 'react';

import type { RootState } from 'src/redux/store';
import { logIn, logOut } from 'src/redux/module/user';
import { useAppSelector, useAppDispatch } from 'src/redux/hooks';
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
