import { useState, useEffect } from 'react';

import useCompetitionStore from '@/store/useCompetitionStore';
import { getParticipateTeams } from '@/api/joinTeamComp';

import * as S from './Index.style';

export default function MatchingPage() {
  const { selectedCompetition } = useCompetitionStore();
  const [teams, setTeams] = useState<IJoinCompTeam[]>([]);

  const getJoinTeams = async () => {
    if (selectedCompetition) {
      const response = await getParticipateTeams(selectedCompetition);
      console.log(response);
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

  useEffect(() => {
    // 팀 리스트 부르기
    getJoinTeams();
    // 조 리스트 부르기
  }, []);

  return (
    <S.Container>
      <S.Content>
        <S.Header>
          <h5>참가 명단</h5>
          <h5>{teams.length} 명</h5>
        </S.Header>
        <S.List>
          {teams.map(team => {
            return (
              <S.ListItem key={team.joinCompId}>
                {team.emblem ? <span>{team.emblem}</span> : <span>{team.name.charAt(0)}</span>}
                <span>{team.name}</span>
              </S.ListItem>
            );
          })}
        </S.List>
      </S.Content>
    </S.Container>
  );
}
