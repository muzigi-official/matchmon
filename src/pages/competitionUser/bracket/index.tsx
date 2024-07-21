import { useState } from 'react';

import Button from '@/components/common/Button';
import { useCreateMatchSettingMutation } from '@/hooks/queries/useMatchSettingQuery';
import useCompetitionStore from '@/store/useCompetitionStore';

import MatchGenerator from './DialogMatchSetting';
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
        <p> 경기설정 세부 정보 </p>
        <Button color='primary' onClick={toggleDialog}>
          경기 설정
        </Button>
      </S.Actions>

      {/* <section>
          <label>구장 수 만큼 추가하고 구장 이름을 입력해주세요.</label>
          <ul>
            {formData.stadiums.map((stadium, index) => (
              <S.Items key={index}>
                <input
                  type='text'
                  value={stadium}
                  onChange={e => handleStadiumChange(index, e.target.value)}
                  placeholder={`구장 ${index + 1}`}
                />

                <S.FabButton color='error' aria-label='remove' onClick={() => removeStadium(index)}>
                  <RemoveIcon fontSize='small' />
                </S.FabButton>
              </S.Items>
            ))}
          </ul>
          <S.FabButton color='success' aria-label='add' onClick={addStadium}>
            <AddIcon fontSize='small' />
          </S.FabButton>
        </section> */}
      <MatchGenerator open={isDialogOpen} onClose={toggleDialog} onSave={saveMatchSettings} />
    </S.Container>
  );
}
