import { useState, useEffect } from 'react';

import { getParticipateTeams } from '@/api/joinTeamComp';
import useCompetitionStore from '@/store/useCompetitionStore';

import * as S from './Index.style';
import TeamList from './ParticipateTeamList';
import GroupList from './GroupList';
import Button from '@/components/common/Button';

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

  const randomGroup = () => {
    console.log('random');
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
  );
}
