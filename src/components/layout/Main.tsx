import React, { useState } from 'react';
import ButtonAppBar from './ButtonAppbar';
import TemporaryDrawer from './TemporaryDrawer';
import { Box } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box width={'100%'}>
      <ButtonAppBar onClickMenu={() => setOpen(true)} />
      <TemporaryDrawer open={open} setOpen={setOpen} />
      {children}
    </Box>
  );
}
