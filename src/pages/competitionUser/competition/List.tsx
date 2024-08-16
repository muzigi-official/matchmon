import { useState } from 'react';

import Button from '@/components/common/Button';
import { useAddCompetitionMutation } from '@/hooks/queries/useCompetitionQuery';
import AddDialog from '@/pages/admin/competition/dialog/AddCompetition';

import * as S from './Container.style';

export default function AdminCompetition() {
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const addCompetitionMutation = useAddCompetitionMutation();

  const onSubmitHandler = (formData: ICompetitionFormInput) => {
    addCompetitionMutation.mutate(formData, {
      onSuccess: () => {
        setDialogOpen(false);
      },
    });
  };

  return (
    <S.Container>
      <h2>자신이 만든 대회 리스트가 보여져야 한다.</h2>
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
