import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RootState } from '@/redux/store';
import { useAppSelector } from '@/redux/hooks';
import { getTeam } from '@/api/team';

import * as S from './Container.style';
import MyButton from '@/components/button/MyButton';
import AddIcon from '@mui/icons-material/Add';
import { getParticipateTeamInPlayers } from '@/api/joinTeamComp';

export default function ParticipateTeamsDetails() {
  const { teamId } = useParams();
  const [team, setTeam] = useState<Team | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const selectedCompetition = useAppSelector((state: RootState) => state.competition.selectedCompetition);
  useEffect(() => {
    fetchTeam();
    fetchParticipateTeams();
  }, []);

  const fetchTeam = async () => {
    if (teamId) {
      const response = await getTeam(teamId);
      setTeam(response);
    }
  };

  const fetchParticipateTeams = async () => {
    if (selectedCompetition) {
      const response = await getParticipateTeamInPlayers(selectedCompetition);
      console.log('res', response);
      // const filteringTeam = response.filter(player)
      setPlayers(response);
    }
  };

  const clickAddPlayer = () => {
    console.log('open dialog');
  };

  return (
    <S.Container>
      <S.Top>
        <h5>참가팀 &gt; {team ? team.name : ''}</h5>
      </S.Top>
      <S.Content>
        <S.Header>
          <h5>참가 명단</h5>
          <h5>00 명</h5>
        </S.Header>
        <S.List>
          {players.map(player => {
            return (
              <S.ListItem key={player.id}>
                {player.uniformNumber ? <span>{player.uniformNumber}</span> : ''}
                <span>{player.nickName}</span>
              </S.ListItem>
            );
          })}
          <S.ListItem>
            <MyButton variant='text' onClick={clickAddPlayer}>
              <AddIcon />
            </MyButton>
          </S.ListItem>
        </S.List>
      </S.Content>
    </S.Container>
  );
}
