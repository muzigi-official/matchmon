import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import VerticalLayoutHeader from './VerticalLayoutHeader';
import LeftDrawer from './LeftDrawer';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import * as S from './Main.style';

const userRole = 'competitionUser'; // 실제 로그인된 사용자의 역할로 설정해야 합니다.

export default function MainLayout() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <VerticalLayoutHeader open={open} onClickMenu={() => setOpen(true)} />
      <LeftDrawer open={open} setOpen={setOpen} role={userRole} />
      <S.MainContainer component='main' sx={{ flexGrow: 1 }}>
        <S.DrawerHeader />
        <Outlet />
      </S.MainContainer>
    </Box>
  );
}
