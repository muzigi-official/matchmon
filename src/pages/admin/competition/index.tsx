import React, { useState } from 'react';
import MyButton from '@/components/button/MyButton';

import './index.scoped.css';
import AddDialog from '@/pageComponent/admin/competition/Dialog';
// import { Button } from '@mui/material';

export default function AdminCompetition() {
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  return (
    <div className='container'>
      <MyButton variant='contained' onClick={() => setDialogOpen(true)}>
        대회 생성
      </MyButton>
      <AddDialog
        open={isDialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
      />
    </div>
  );
}
