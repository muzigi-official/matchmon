import { useState, useEffect } from 'react';

import { getParticipateTeams } from '@/api/joinTeamComp';
import useCompetitionStore from '@/store/useCompetitionStore';

import * as S from './Index.style';
import TeamList from './ParticipateTeamList';
import GroupList from './GroupList';

interface IGroup {
  id: number;
  name: string;
  teams: ITeam[];
}

export default function MatchingPage() {
  const { selectedCompetition } = useCompetitionStore();
  const [teams, setTeams] = useState<IJoinCompTeam[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);

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
    console.log('add group');
    console.log('open dialog');
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
        ],
      },
      {
        id: 2,
        name: 'Group B',
        teams: [
          { id: 3, name: 'Team 3', emblem: '/empty_emblem.png', location: 'Seoul', gender: 'F' },
          { id: 4, name: 'Team 4', emblem: '/empty_emblem.png', location: 'Seoul', gender: 'F' },
        ],
      },
    ];
    setGroups(dummyGroups);
  }, []);

  return (
    <S.Container>
      <S.LeftPanel>
        <S.Header>
          <h5>참가 명단</h5>
          <h5>{teams.length} 명</h5>
        </S.Header>
        <TeamList teams={teams} />
      </S.LeftPanel>
      <S.RightPanel>
        <GroupList groups={groups} onAddGroup={handleAddGroup} />
      </S.RightPanel>
    </S.Container>
  );
}
