import { useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import { useCreateMatchSettingMutation, useMatchSettingQuery } from '@/hooks/queries/useMatchSettingQuery';
import { useJoinCompTeamsQuery } from '@/hooks/queries/useJoinCompTeamQuery';
import useCompetitionStore from '@/store/useCompetitionStore';
import { generateSchedule } from '@/utils/match';

import MatchGenerator from './DialogMatchSetting';
import MatchInfoBox from './MatchInfoBox';
import StadiumTabs from './StadiumTabs';

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
/* TODO: 
2. 수정상태와 뷰상태를 토글 스위치로 구분해서 보여주기
3. 백엔드 작업 매치 스케쥴? 만들기 그래서 백엔드랑 연동하기
*/

const createStadiumOptions = (stadiumCount: number = 2) => {
  const stadiums = Array(stadiumCount)
    .fill('')
    .map((_, i) => `${String.fromCharCode(65 + i)}구장`);
  return stadiums.map(stadium => ({ value: stadium, text: stadium }));
};

export default function BracketPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [matches, setMatches] = useState<IMatchSchedule[]>([]);
  const [stadiumOptions, setStadiumOptions] = useState<ISelectProperty[]>([]);

  const { selectedCompetition } = useCompetitionStore();
  const createMatchSettingMutation = useCreateMatchSettingMutation();
  const { data: joinCompTeams } = useJoinCompTeamsQuery(selectedCompetition || 0);
  const { data: matchSettings, isLoading: isMatchSettingLoading } = useMatchSettingQuery(selectedCompetition || 0);

  const teamOptions =
    joinCompTeams?.map(item => ({
      value: item.team.id,
      text: item.team.name,
      group: item.groupStage.name,
    })) || [];

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

  const createAutoSchdule = () => {
    if (joinCompTeams) {
      const groups = joinCompTeams.reduce((acc: Record<string, ITeam[]>, item) => {
        const groupName = item.groupStage.name;
        if (!acc[groupName]) {
          acc[groupName] = [];
        }
        acc[groupName].push(item.team);
        return acc;
      }, {});

      if (matchSettings) {
        const groupLeague = matchSettings[0];
        const stadiums = createStadiumOptions(groupLeague.stadiumCount || 2).map(option => option.value);

        const autoParams = {
          //FIXME: startTime과 breakTime은 나중에 입력받을 수 있도록 해줘야 함.
          startTime: '09:00',
          matchDuration: groupLeague.matchDuration,
          breakTime: 5,
          stadiums,
          groups,
        };

        const res = generateSchedule(autoParams);
        setMatches(res);
      }
    }
  };

  const addMatch = () => {
    setMatches([...matches, { time: '', stadium: '', homeTeam: '', awayTeam: '', homeTeamId: 0, awayTeamId: 0 }]);
  };

  const removeMatch = (index: number) => {
    setMatches(matches.filter((_, i) => i !== index));
  };

  const handleMatchChange = (index: number, field: keyof IMatchSchedule, value: string | number) => {
    const updatedMatches = matches.map((match, i) => (i === index ? { ...match, [field]: value } : match));
    setMatches(updatedMatches);
  };

  useEffect(() => {
    if (matchSettings && matchSettings.length > 0) {
      const groupLeague = matchSettings[0];
      setStadiumOptions(createStadiumOptions(groupLeague.stadiumCount || 2));
    }
  }, [matchSettings]);

  return (
    <S.Container className='container'>
      <S.Top>
        <S.Title>
          <span>시간표/대진표</span>
        </S.Title>
      </S.Top>
      <S.Actions>
        <MatchInfoBox isLoading={isMatchSettingLoading} infos={matchSettings || []} />
        <div>
          <Button color='primary' onClick={toggleDialog}>
            경기 설정
          </Button>
        </div>
      </S.Actions>
      <S.Content>
        <div>
          <Button variant='outlined' color='primary' onClick={createAutoSchdule}>
            일정 자동 생성
          </Button>
        </div>
        <StadiumTabs
          schedules={matches}
          stadiumsOptions={stadiumOptions}
          teamOptions={teamOptions}
          addMatch={addMatch}
          removeMatch={removeMatch}
          handleMatchChange={handleMatchChange}
        />
      </S.Content>

      <MatchGenerator open={isDialogOpen} onClose={toggleDialog} onSave={saveMatchSettings} />
    </S.Container>
  );
}
