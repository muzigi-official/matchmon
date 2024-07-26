import { useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import {
  useCreateMatchSettingMutation,
  useMatchSettingQuery,
  useUpdateMatchSettingMutation,
  useDeleteMatchSettingMutation,
} from '@/hooks/queries/useMatchSettingQuery';
import { useJoinCompTeamsQuery } from '@/hooks/queries/useJoinCompTeamQuery';
import {
  useMatchSchedulesQuery,
  useCreateMatchScheduleMutation,
  useCreateMatchSchedulesMutation,
  useUpdateMatchScheduleMutation,
  useDeleteMatchScheduleMutation,
} from '@/hooks/queries/useMatchScheduleQuery';
import useCompetitionStore from '@/store/useCompetitionStore';
import { generateSchedule } from '@/utils/match';

import DialogMatchSetting from './DialogMatchSetting';
import MatchInfoBox from './MatchInfoBox';
import StadiumTabs from './StadiumTabs';

import * as S from './Index.style';

export interface IEvent {
  name: string;
  time: string;
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentSetting, setCurrentSetting] = useState<IMatchSettingParams | null>(null);
  const [matches, setMatches] = useState<IMatchSchedule[]>([]);
  const [changeMatches, setChangeMatches] = useState<Partial<IMatchScheduleDto>[]>([]);
  const [stadiumOptions, setStadiumOptions] = useState<ISelectProperty[]>([]);

  const { selectedCompetition } = useCompetitionStore();
  const createMatchSettingMutation = useCreateMatchSettingMutation();
  const updateMatchSettingMutation = useUpdateMatchSettingMutation(selectedCompetition || 0);
  const deleteMatchSettingMutation = useDeleteMatchSettingMutation(selectedCompetition || 0);

  const { data: matchSchedules, isLoading: schedulesLoading } = useMatchSchedulesQuery(selectedCompetition || 0);
  const createMatchScheduleMutation = useCreateMatchSchedulesMutation(selectedCompetition || 0);
  const createMatchSchedulesMutation = useCreateMatchSchedulesMutation(selectedCompetition || 0);
  const updateMatchScheduleMutation = useUpdateMatchScheduleMutation(selectedCompetition || 0);
  const deleteMatchScheduleMutation = useDeleteMatchScheduleMutation(selectedCompetition || 0);

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
    if (!isDialogOpen) {
      setIsEditMode(false);
    }
  };

  const saveMatchSettings = (formData: ICreateMatchSettingParams) => {
    console.log('save', formData);
    if (selectedCompetition) {
      console.log('create');
      createMatchSettingMutation.mutate(
        { competitionId: selectedCompetition, ...formData },
        {
          onSuccess: () => {
            setIsDialogOpen(false);
            setIsEditMode(false);
          },
        },
      );
    }
  };

  const updateMatchSettings = (formData: IMatchSettingParams) => {
    updateMatchSettingMutation.mutate(formData, {
      onSuccess: () => {
        console.log('Match settings updated successfully');
        setIsDialogOpen(false);
        setIsEditMode(false);
      },
      onError: error => {
        console.error('Error updating match settings:', error);
      },
    });
  };

  const editMatchSettings = (setting: IMatchSettingParams) => {
    setCurrentSetting(setting);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDeleteMatchSetting = (id: number) => {
    deleteMatchSettingMutation.mutate(id);
  };

  const createAutoSchedule = () => {
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
        console.log('res', res);
        setMatches(res);
        saveBulkSchedules(res); // 생성된 시간표를 저장
      }
    }
  };

  const saveBulkSchedules = async (matchScheduleDtos: IMatchSchedule[]) => {
    try {
      createMatchSchedulesMutation.mutate(matchScheduleDtos);
      alert('전체 시간표가 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('전체 시간표 저장 중 오류가 발생했습니다:', error);
    }
  };

  const addMatch = () => {
    setMatches([
      ...matches,
      { matchTime: '', stadium: '', homeTeamName: '', awayTeamName: '', homeTeamId: 0, awayTeamId: 0 },
    ]);
  };

  const removeMatch = (index: number) => {
    setMatches(matches.filter((_, i) => i !== index));
    handleDeleteMatchSchdule(index);
  };

  const handleMatchChange = (index: number, field: keyof IMatchSchedule, value: string | number) => {
    const updatedMatches = matches.map((match, i) => {
      if (i === index) {
        const updatedMatch = { ...match, [field]: value };
        setChangeMatches(prev => [...prev, updatedMatch]); // 변경 사항 추적
        return updatedMatch;
      }
      return match;
    });
    setMatches(updatedMatches);
  };

  const saveChanges = async () => {
    console.log(changeMatches);
    try {
      createMatchScheduleMutation.mutate(changeMatches);
      alert('변경 사항이 성공적으로 저장되었습니다.');
      setChangeMatches([]); // 저장 후 변경 사항 초기화
    } catch (error) {
      console.error('변경 사항 저장 중 오류가 발생했습니다:', error);
    }
  };

  const updateMatchSchedule = (formData: IMatchScheduleDto) => {
    updateMatchScheduleMutation.mutate(formData);
  };

  const handleDeleteMatchSchdule = (id: number) => {
    deleteMatchScheduleMutation.mutate(id);
  };

  useEffect(() => {
    if (matchSettings && matchSettings.length > 0) {
      const groupLeague = matchSettings[0];
      setStadiumOptions(createStadiumOptions(groupLeague.stadiumCount || 2));
    }
  }, [matchSettings]);

  useEffect(() => {
    if (matchSchedules) {
      console.log('matchSchedules', matchSchedules);
      setMatches(matchSchedules);
    }
  }, [matchSchedules]);

  return (
    <S.Container className='container'>
      <S.Top>
        <S.Title>
          <span>시간표/대진표</span>
        </S.Title>
      </S.Top>
      <S.Actions>
        <MatchInfoBox
          isLoading={isMatchSettingLoading}
          infos={matchSettings || []}
          onEdit={editMatchSettings}
          onDelete={handleDeleteMatchSetting}
        />
        <div>
          <Button color='primary' onClick={toggleDialog}>
            경기 설정
          </Button>
        </div>
      </S.Actions>
      <S.Content>
        <StadiumTabs
          isLoading={schedulesLoading}
          schedules={matches}
          stadiumsOptions={stadiumOptions}
          teamOptions={teamOptions}
          addMatch={addMatch}
          createAutoSchedule={createAutoSchedule}
          removeMatch={removeMatch}
          handleMatchChange={handleMatchChange}
        />
      </S.Content>

      <DialogMatchSetting
        open={isDialogOpen}
        isUpdate={isEditMode}
        onClose={toggleDialog}
        onSave={isEditMode ? updateMatchSettings : saveMatchSettings}
        initialValues={currentSetting || undefined}
      />
    </S.Container>
  );
}
