import { useState } from 'react';

import Button from '@/components/common/Button';
import { useCreateMatchSettingMutation, useMatchSettingQuery } from '@/hooks/queries/useMatchSettingQuery';
import { useJoinCompTeamsQuery } from '@/hooks/queries/useJoinCompTeamQuery';

import useCompetitionStore from '@/store/useCompetitionStore';

import MatchGenerator from './DialogMatchSetting';
import MatchInfoBox from './MatchInfoBox';

import * as S from './Index.style';
import { generateSchedule } from '@/utils/match';
import StadiumTabs from './StadiumTabs';

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
  const [matches, setMatches] = useState<IMatchSchedule[]>([]);

  const { selectedCompetition } = useCompetitionStore();
  const createMatchSettingMutation = useCreateMatchSettingMutation();
  const { data: joinCompTeams } = useJoinCompTeamsQuery(selectedCompetition || 0);
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

        const autoParams = {
          startTime: '09:00',
          matchDuration: groupLeague.matchDuration,
          breakTime: 5,
          stadiums: Array(groupLeague?.stadiumCount || 2)
            .fill('')
            .map((_, i) => `${String.fromCharCode(65 + i)}구장`),
          groups, // 예시 값
        };

        const res = generateSchedule(autoParams);
        console.log(res);
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

  const handleMatchChange = (index: number, field: keyof IMatchSchedule, value: string) => {
    const updatedMatches = matches.map((match, i) => (i === index ? { ...match, [field]: value } : match));
    setMatches(updatedMatches);
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
        <div>
          <Button color='primary' onClick={createAutoSchdule}>
            일정 자동 생성
          </Button>
          <Button color='primary' onClick={toggleDialog}>
            경기 설정
          </Button>
        </div>
      </S.Actions>
      <S.Content>
        <StadiumTabs
          schedules={matches}
          addMatch={addMatch}
          removeMatch={removeMatch}
          handleMatchChange={handleMatchChange}
        />
      </S.Content>

      <MatchGenerator open={isDialogOpen} onClose={toggleDialog} onSave={saveMatchSettings} />
    </S.Container>
  );
}
