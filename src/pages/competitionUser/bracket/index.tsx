import { useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import {
  useCreateMatchSettingMutation,
  useMatchSettingQuery,
  useUpdateMatchSettingMutation,
  useDeleteMatchSettingMutation,
} from '@/hooks/queries/useMatchSettingQuery';
import { useParticipateTeamsQuery } from '@/hooks/queries/useJoinCompTeamQuery';
import {
  useMatchSchedulesQuery,
  useCreateScheduleBulkMutation,
  useUpdateMatchScheduleMutation,
  useUpdateBulkMatchSchedulesMutation,
  useDeleteMatchScheduleMutation,
  useDeleteMatchSchedulesByCompetitionIdMutation,
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
  const [matches, setMatches] = useState<IMatchScheduleDto[]>([]);
  const [stadiumOptions, setStadiumOptions] = useState<ISelectProperty[]>([]);

  const { selectedCompetition } = useCompetitionStore();
  const createMatchSettingMutation = useCreateMatchSettingMutation();
  const updateMatchSettingMutation = useUpdateMatchSettingMutation(selectedCompetition || 0);
  const deleteMatchSettingMutation = useDeleteMatchSettingMutation(selectedCompetition || 0);

  const { data: matchSchedules, isLoading: schedulesLoading } = useMatchSchedulesQuery(selectedCompetition || 0);
  const createScheduleBulkMutation = useCreateScheduleBulkMutation(selectedCompetition || 0);
  const updateMatchScheduleMutation = useUpdateMatchScheduleMutation(selectedCompetition || 0);
  const updateBulkMatchSchedulesMutation = useUpdateBulkMatchSchedulesMutation(selectedCompetition || 0);
  const deleteMatchScheduleMutation = useDeleteMatchScheduleMutation(selectedCompetition || 0);
  const deleteMatchSchedulesByCompetitionIdMutation = useDeleteMatchSchedulesByCompetitionIdMutation(
    selectedCompetition || 0,
  );

  const { data: joinCompTeams } = useParticipateTeamsQuery(selectedCompetition || 0);
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
    if (selectedCompetition) {
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
    // FIXME: 날짜 추가되도록 수정, groupStageid 도 추가해줘야함. list 보일때,
    // 그러면서 팀 선택될 때 조 id가 셀렉트를 잘 나눠주게도 했으면 좋겠음.
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
          startTime: '09:00',
          matchDuration: groupLeague.matchDuration,
          breakTime: 5,
          stadiums,
          groups,
        };

        const res = generateSchedule(autoParams);
        setMatches(res);
        saveBulkSchedules(res);
      }
    }
  };

  const saveBulkSchedules = async (matchScheduleDtos: IMatchScheduleDto[]) => {
    try {
      const res = await createScheduleBulkMutation.mutateAsync(matchScheduleDtos);
      console.log(res);
    } catch (error) {
      console.error('전체 시간표 저장 중 오류가 발생했습니다:', error);
    }
  };

  const updateBulkSchedules = async () => {
    console.log(matches);
    try {
      await updateBulkMatchSchedulesMutation.mutate(matches);
    } catch (error) {
      console.error('시간표 수정 중 오류가 발생했습니다:', error);
    }
  };

  const addMatch = () => {
    setMatches([
      ...matches,
      {
        id: Date.now(),
        matchTime: '',
        stadium: '',
        homeTeamName: '',
        awayTeamName: '',
        homeTeamId: 0,
        awayTeamId: 0,
        isTemporary: true,
      },
    ]);
  };

  const removeMatch = (matchSchedule: IMatchScheduleDto) => {
    const matchToRemove = matches.find(match => match.id === matchSchedule.id);

    if (matchToRemove) {
      if (!matchToRemove.isTemporary) {
        if (matchSchedule.id !== undefined) {
          handleDeleteMatchSchdule(matchSchedule.id);
        } else {
          console.error('Cannot delete match with undefined id');
        }
      }

      setMatches(matches.filter(match => match.id !== matchSchedule.id));
    }
  };

  const removeAllMatches = () => {
    deleteMatchSchedulesByCompetitionIdMutation.mutate();
  };

  const handleMatchChange = (id: number, field: keyof IMatchScheduleDto, value: string | number) => {
    const updatedMatches = matches.map(match => {
      if (match.id === id) {
        const updatedMatch = { ...match, [field]: value };
        if (field === 'homeTeamId') {
          const team = teamOptions.find(option => option.value === value);
          if (team) {
            updatedMatch.homeTeamName = team.text;
          }
        } else if (field === 'awayTeamId') {
          const team = teamOptions.find(option => option.value === value);
          if (team) {
            updatedMatch.awayTeamName = team.text;
          }
        }
        return updatedMatch;
      }
      return match;
    });

    setMatches(updatedMatches);
  };

  const updateMatchSchedule = (formData: IMatchScheduleDto) => {
    console.log('update', formData);
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
          handleMatchChange={handleMatchChange}
          updateMatch={updateMatchSchedule}
          updateAllMatches={updateBulkSchedules}
          removeMatch={removeMatch}
          removeAllMatches={removeAllMatches}
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
