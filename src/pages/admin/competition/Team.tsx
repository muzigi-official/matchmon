import React, { useState } from 'react';
import { RootState } from '@/redux/store';
import { useAppSelector } from '@/redux/hooks';

import MyButton from '@/components/button/MyButton';

import * as S from './Container.style';

export default function ParticipateTeams() {
  // TODO: 참가팀 API로 불러오기
  const selectedCompetition = useAppSelector((state: RootState) => state.competition.selectedCompetition);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const splitGroup = () => {
    console.log('split group');
  };

  return (
    <S.Container>
      <S.Top>
        <MyButton variant='contained' onClick={splitGroup}>
          조짜기
        </MyButton>
        <MyButton variant='contained' onClick={() => setDialogOpen(true)}>
          팀 추가
        </MyButton>
      </S.Top>
      <div>
        {selectedCompetition ? <h3>참가팀</h3> : <h5>대회를 선택하세요.</h5>}
        dialog 열어줘 {isDialogOpen}
      </div>
    </S.Container>
  );
}
