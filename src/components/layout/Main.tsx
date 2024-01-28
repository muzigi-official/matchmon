import React, { useState } from 'react';
import ButtonAppBar from './ButtonAppbar';
import LeftDrawer from './LeftDrawer';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box width={'100%'}>
      <ButtonAppBar onClickMenu={() => setOpen(true)} />
      <LeftDrawer open={open} setOpen={setOpen} />
      <Outlet />
    </Box>
  );
}
