import { useState, useEffect } from 'react';

// import Button from '@/components/common/Button';
import { getParticipateTeams } from '@/api/joinTeamComp';
import {
  useGroupstageWithTeamsQuery,
  useCreateGroupstageMutation,
  useDeleteGroupstageMutation,
  useAddTeamToGroupMutation,
  useRemoveTeamFromGroupMutation,
} from '@/hooks/queries/useGroupStageQuery';

import useCompetitionStore from '@/store/useCompetitionStore';

import TeamList from './ParticipateTeamList';
import GroupList from './GroupList';
import DialogTeamSelect from './DialogTeamSelect';

import * as S from './Index.style';

export default function MatchingPage() {
  const [teams, setTeams] = useState<IJoinCompTeam[]>([]);
  const [isOpenDialog, setOpenDialog] = useState<boolean>(false);
  const [groups, setGroups] = useState<IGroupStage[]>([]);
  const [groupName, setGroupName] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<IGroupStage | null>(null);
  const [selectedGroupTeams, setSelectedGroupTeams] = useState<IJoinCompTeam[]>([]);

  const { selectedCompetition } = useCompetitionStore();
  const {
    data: groupStages,
    error: groupStagesError,
    isLoading: groupStagesLoading,
  } = useGroupstageWithTeamsQuery(selectedCompetition || 0);
  const createGroupstageMutation = useCreateGroupstageMutation();
  const deleteGroupstageMutation = useDeleteGroupstageMutation(selectedCompetition || 0);
  const addTeamToGroupMutation = useAddTeamToGroupMutation(selectedCompetition || 0);
  const removeTeamFromGroupMutation = useRemoveTeamFromGroupMutation(selectedCompetition || 0);

  const getJoinTeams = async () => {
    if (selectedCompetition) {
      const response = await getParticipateTeams(selectedCompetition);
      const parseTeams = response.map(item => {
        const { id, team, participateState, groupStage } = item;
        return {
          joinCompId: id,
          emblem: team.emblem,
          name: team.name,
          teamId: team.id,
          participateState,
          group: groupStage ? groupStage.name : '-',
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
      createGroupstageMutation.mutate(
        { competitionId: selectedCompetition, groupName: newGroupName },
        {
          onSuccess: data => {
            setSelectedGroup(data);
          },
        },
      );
    }
  };

  const handleRemoveGroup = (group: IGroupStage) => {
    deleteGroupstageMutation.mutate(group.id);
  };

  const handleSelectGroup = (group: IGroupStage) => {
    setSelectedGroup(group);
    setGroupName(group.name);
    setSelectedGroupTeams(group.joinTeamComps);
    setOpenDialog(true);
  };

  const clickTeam = (team: IJoinCompTeam) => {
    if (selectedGroup) {
      if (selectedGroupTeams.some(t => t.teamId === team.teamId)) {
        removeTeamFromGroupMutation.mutate(
          { groupId: selectedGroup.id, teamId: team.teamId },
          {
            onSuccess: () => {
              setSelectedGroupTeams(prevTeams => prevTeams.filter(t => t.teamId !== team.teamId));
            },
          },
        );
      } else {
        addTeamToGroupMutation.mutate(
          { groupId: selectedGroup.id, teamId: team.teamId },
          {
            onSuccess: () => {
              setSelectedGroupTeams(prevTeams => {
                return [...prevTeams, team];
              });
            },
          },
        );
      }
    }
  };

  // const randomGroup = () => {
  //   console.log('random team');
  // };

  useEffect(() => {
    getJoinTeams();
  }, [selectedCompetition]);

  useEffect(() => {
    if (groupStages) {
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
          {/* <Button color='primary' onClick={randomGroup}>
            toast
          </Button> */}
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
            <GroupList
              groups={groups}
              onAddGroup={handleAddGroup}
              onSelectGroup={handleSelectGroup}
              onRemoveGroup={handleRemoveGroup}
            />
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
