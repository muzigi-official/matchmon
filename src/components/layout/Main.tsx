import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import VerticalLayoutHeader from './VerticalLayoutHeader';
import LeftDrawer from './LeftDrawer';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import * as S from './Main.style';

export default function MainLayout() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <VerticalLayoutHeader open={open} onClickMenu={() => setOpen(true)} />
      <LeftDrawer open={open} setOpen={setOpen} />
      <S.MainContainer component='main' sx={{ flexGrow: 1 }}>
        <S.DrawerHeader />
        <Outlet />
      </S.MainContainer>
    </Box>
  );
}
