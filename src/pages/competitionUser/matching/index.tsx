import { useState, useEffect } from 'react';

import Button from '@/components/common/Button';
import { getParticipateTeams } from '@/api/joinTeamComp';
import useCompetitionStore from '@/store/useCompetitionStore';

import TeamList from './ParticipateTeamList';
import GroupList from './GroupList';
import DialogTeamSelect from './DialogTeamSelect';

import * as S from './Index.style';

interface IGroup {
  id: number;
  name: string;
  teams: ITeam[];
}

export default function MatchingPage() {
  const { selectedCompetition } = useCompetitionStore();
  const [teams, setTeams] = useState<IJoinCompTeam[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [groups, setGroups] = useState<IGroup[]>([]);
  // const [selectedGroup, setSelectedGroup] = useState<IGroup | null>(null);

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
    const newGroupName = ` ${String.fromCharCode(65 + groups.length)}조`;
    const newGroup = {
      id: groups.length + 1,
      name: newGroupName,
      teams: [],
    };
    setGroups([...groups, newGroup]);
  };

  const randomGroup = () => {
    console.log('random');
  };

  const saveGroup = () => {
    console.log('save');
  };

  const clickTeam = (team: IJoinCompTeam) => {
    console.log('click team', team);
  };

  useEffect(() => {
    // 팀 리스트 부르기
    getJoinTeams();
    // 조 리스트 부르기
  }, []);

  useEffect(() => {
    // TODO: 그룹 리스트를 불러오는 로직 추가
    // 임시로 더미 데이터를 사용
    const dummyGroups = [
      {
        id: 1,
        name: 'Group A',
        teams: [
          { id: 1, name: 'Team 1', emblem: '/empty_emblem.png', location: 'Seoul', gender: 'F' },
          { id: 2, name: 'Team 2', emblem: '/empty_emblem.png', location: 'Seoul', gender: 'F' },
          { id: 3, name: 'Team 3', emblem: '/empty_emblem.png', location: 'Seoul', gender: 'F' },
          { id: 4, name: 'Team 4', emblem: '/empty_emblem.png', location: 'Seoul', gender: 'F' },
        ],
      },
    ];
    setGroups(dummyGroups);
  }, []);

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
            <GroupList groups={groups} onAddGroup={handleAddGroup} />
          </S.RightPanel>
        </S.Content>
      </S.Container>
      <DialogTeamSelect
        open={openDialog}
        teams={teams}
        onClick={clickTeam}
        onSave={saveGroup}
        onClose={() => {
          setOpenDialog(false);
        }}
      />
    </>
  );
}
