import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { USER_ROLE } from '@/constant/DefaultSetting';
import useUserStore from '@/store/useUserStore';

import VerticalLayoutHeader from './VerticalLayoutHeader';
import LeftDrawer from './LeftDrawer';

import * as S from './Main.style';

interface IUserInfo {
  userName: string;
  userRole: TUserRole;
}

export default function MainLayout() {
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useUserStore();
  const userInfo = { userName: '', userRole: 'user' } as IUserInfo;
  if (user) {
    userInfo.userName = user.username;
    userInfo.userRole = USER_ROLE[user.auth] as TUserRole;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <VerticalLayoutHeader
        open={open}
        userRole={userInfo.userRole}
        userName={userInfo.userName}
        onClickMenu={() => setOpen(true)}
      />
      <LeftDrawer open={open} setOpen={setOpen} role={userInfo.userRole} />
      <S.MainContainer component='main' sx={{ flexGrow: 1 }}>
        <S.DrawerHeader />
        <Outlet />
      </S.MainContainer>
    </Box>
  );
}
