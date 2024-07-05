import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import useUserStore from '@/store/useUserStore';

import VerticalLayoutHeader from './VerticalLayoutHeader';
import LeftDrawer from './LeftDrawer';

import * as S from './Main.style';

export default function MainLayout() {
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useUserStore();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <VerticalLayoutHeader
        open={open}
        userRole={user?.role}
        userName={user?.username}
        onClickMenu={() => setOpen(true)}
      />
      <LeftDrawer open={open} setOpen={setOpen} role={user?.role} />
      <S.MainContainer component='main' sx={{ flexGrow: 1 }}>
        <S.DrawerHeader />
        <Outlet />
      </S.MainContainer>
    </Box>
  );
}
