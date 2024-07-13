import { useState, useEffect } from 'react';

import Button from '@/components/common/Button';
import { getParticipateTeams } from '@/api/joinTeamComp';
import {
  useGroupstageWithTeamsQuery,
  useCreateGroupstageMutation,
  useAddTeamToGroupMutation,
} from '@/hooks/queries/useGroupStageQuery';

import useCompetitionStore from '@/store/useCompetitionStore';

import TeamList from './ParticipateTeamList';
import GroupList from './GroupList';
import DialogTeamSelect from './DialogTeamSelect';

import * as S from './Index.style';

export default function MatchingPage() {
  const { selectedCompetition } = useCompetitionStore();
  const [teams, setTeams] = useState<IJoinCompTeam[]>([]);
  const [isOpenDialog, setOpenDialog] = useState<boolean>(false);
  const [groups, setGroups] = useState<IGroupStage[]>([]);
  const [groupName, setGroupName] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<IGroupStage | null>(null);
  const [selectedGroupTeams, setSelectedGroupTeams] = useState<IJoinCompTeam[]>([]);

  const {
    data: groupStages,
    error: groupStagesError,
    isLoading: groupStagesLoading,
  } = useGroupstageWithTeamsQuery(selectedCompetition || 0);

  const createGroupstageMutation = useCreateGroupstageMutation();
  const addTeamToGroupMutation = useAddTeamToGroupMutation();

  const getJoinTeams = async () => {
    if (selectedCompetition) {
      const response = await getParticipateTeams(selectedCompetition);
      const parseTeams = response.map(item => {
        const { id, team, participateState } = item;
        return {
          joinCompId: id,
          emblem: team.emblem,
          name: team.name,
          teamId: team.id,
          participateState,
          group: '-',
        };
      });
      setTeams(parseTeams);
    }
  };

  const handleAddGroup = () => {
    setOpenDialog(true);

    // 그룹 생성하는 api 만들어져야함.
    const newGroupName = ` ${String.fromCharCode(65 + groups.length)}`;
    setGroupName(newGroupName);
    if (selectedCompetition) {
      createGroupstageMutation.mutate({ competitionId: selectedCompetition, groupName: newGroupName });
    }
  };

  // 이거 카드 클릭했을 때 실행 시켜주고 싶음....
  const handleSelectGroup = (group: IGroupStage) => {
    setSelectedGroup(group);
    setGroupName(group.name);
    setSelectedGroupTeams(group.joinTeamComps);
    setOpenDialog(true);
  };

  const clickTeam = (team: IJoinCompTeam) => {
    console.log('click team', team);
    // 그룹에 팀 추가하는 api 만들꺼야.
    if (selectedGroup) {
      addTeamToGroupMutation.mutate({ groupId: selectedGroup.id, teamId: team.teamId });
    }
  };

  const randomGroup = () => {
    console.log('random team');
  };

  useEffect(() => {
    // 전체 대회 참가 팀 리스트 부르기
    getJoinTeams();
  }, [selectedCompetition]);

  useEffect(() => {
    if (groupStages) {
      console.log(groupStages);
      // 조 리스트 부르기
      setGroups(groupStages);
    }
  }, [groupStages]);

  if (groupStagesLoading) return <div>Loading...</div>;
  if (groupStagesError) return <div>Error: {groupStagesError?.message}</div>;

  return (
    <>
      <S.Container>
        <S.Top>
          <S.Title>
            <a href='/competition/participateTeams'>전체 참가 팀</a>
            <span>/</span>
            <span>{selectedCompetition}</span>
          </S.Title>
        </S.Top>
        <S.Actions>
          <Button color='primary' onClick={randomGroup}>
            랜덤 조 생성
          </Button>
        </S.Actions>
        <S.Content>
          <S.LeftPanel>
            <S.Header>
              <h5>참석 팀</h5>
              <h5>{teams.length} 팀</h5>
            </S.Header>
            <TeamList teams={teams} />
          </S.LeftPanel>
          <S.RightPanel>
            <GroupList groups={groups} onAddGroup={handleAddGroup} onSelectGroup={handleSelectGroup} />
          </S.RightPanel>
        </S.Content>
      </S.Container>
      <DialogTeamSelect
        open={isOpenDialog}
        teams={teams}
        selectedGroupTeams={selectedGroupTeams}
        groupName={groupName}
        onClick={clickTeam}
        onClose={() => {
          setOpenDialog(false);
        }}
      />
    </>
  );
}
