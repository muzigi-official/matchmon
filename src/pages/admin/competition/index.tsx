import React, { useState } from 'react';
import MyButton from '@/components/button/MyButton';

import AddDialog from '@/pageComponent/admin/competition/Dialog';

import * as S from './Container.style';

export default function AdminCompetition() {
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  return (
    <S.Container>
      {/* 조건: 팀 선택을 하지 않았을 경우 대회 생성 버튼이 보인다. */}
      <MyButton variant='contained' onClick={() => setDialogOpen(true)}>
        대회 생성
      </MyButton>
      <AddDialog
        open={isDialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
      />
    </S.Container>
  );
}
