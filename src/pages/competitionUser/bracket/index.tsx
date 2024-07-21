import { useState } from 'react';

import Button from '@/components/common/Button';
import { useCreateMatchSettingMutation, useMatchSettingQuery } from '@/hooks/queries/useMatchSettingQuery';
import useCompetitionStore from '@/store/useCompetitionStore';

import MatchGenerator from './DialogMatchSetting';
import MatchInfoBox from './MatchInfoBox';

import * as S from './Index.style';

export interface IEvent {
  name: string;
  time: string;
}

interface IFormData {
  stage: string;
  stadiumCount: number;
  matchDuration: number;
  hasHalves: boolean;
}

export default function BracketPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { selectedCompetition } = useCompetitionStore();
  const createMatchSettingMutation = useCreateMatchSettingMutation();
  const { data: matchSettings, isLoading: isMatchSettingLoading } = useMatchSettingQuery(selectedCompetition || 0);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const saveMatchSettings = (formData: IFormData) => {
    if (selectedCompetition) {
      createMatchSettingMutation.mutate(
        { competitionId: selectedCompetition, ...formData },
        {
          onSuccess: () => {
            console.log('Match settings saved successfully');
            setIsDialogOpen(false);
          },
          onError: error => {
            console.error('Error saving match settings:', error);
          },
        },
      );
    }
  };

  return (
    <S.Container className='container'>
      <S.Top>
        <S.Title>
          <span>시간표/대진표</span>
        </S.Title>
      </S.Top>
      <S.Actions>
        <MatchInfoBox isLoading={isMatchSettingLoading} infos={matchSettings || []} />
        <Button color='primary' onClick={toggleDialog}>
          경기 설정
        </Button>
      </S.Actions>

      <MatchGenerator open={isDialogOpen} onClose={toggleDialog} onSave={saveMatchSettings} />
    </S.Container>
  );
}
