import { useState } from 'react';

import Button from '@/components/common/Button';
import MatchGenerator from './DialogMatchGenerator';
import * as S from './Index.style';

export interface IEvent {
  name: string;
  time: string;
}

export interface IFormData {
  startTime: string;
  matchDuration: number;
  restTime: number;
  halfTimeRest: boolean;
  stadiums: string[];
  events: IEvent[];
}

export default function AdmiBracket() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const configureMatchSettings = (formData: IFormData) => {
    console.log('Generated Schedule:', formData);
    setIsDialogOpen(false);
  };

  return (
    <S.Container className='container'>
      <S.Top>
        <S.Title>
          <span>시간표/대진표</span>
        </S.Title>
      </S.Top>
      <S.Actions>
        <p> 경기설정 세부 정보 </p>
        <Button color='primary' onClick={toggleDialog}>
          경기 설정
        </Button>
      </S.Actions>
      <MatchGenerator open={isDialogOpen} onClose={toggleDialog} onSubmit={configureMatchSettings} />
    </S.Container>
  );
}
