import React, { useState } from 'react';
import Button from '@/components/common/Button';

import AddDialog from '@/pageComponent/admin/competition/Dialog';

import * as S from './Container.style';

export default function AdminCompetition() {
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  return (
    <S.Container>
      {/* 조건: 팀 선택을 하지 않았을 경우 대회 생성 버튼이 보인다. */}
      <Button variant='contained' onClick={() => setDialogOpen(true)}>
        대회 생성
      </Button>
      <AddDialog
        open={isDialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
      />
    </S.Container>
  );
}
