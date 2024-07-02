import { useState } from 'react';

import { addCompetition } from '@/api/competition';
import Button from '@/components/common/Button';
import AddDialog from '@/pageComponent/admin/competition/Dialog';

import * as S from './Container.style';

export default function AdminCompetition() {
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  const onSubmitHandler = async (formData: ICompetitionFormInput) => {
    const { statusText } = await addCompetition(formData);
    if (statusText === 'Created') {
      alert('대회 등록 성공');
      setDialogOpen(false);
    }
  };

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
        onConfirm={onSubmitHandler}
      />
    </S.Container>
  );
}
