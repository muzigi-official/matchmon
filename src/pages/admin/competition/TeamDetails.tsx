import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTeam } from '@/api/team';

import * as S from './Container.style';

export default function ParticipateTeamsDetails() {
  const { teamId } = useParams();
  const [team, setTeam] = useState<Team | null>(null);
  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    if (teamId) {
      const response = await getTeam(teamId);
      console.log(response);
      setTeam(response);
    }
  };

  return (
    <S.Container>
      <S.Top>
        <h5>참가팀: {team ? team.name : ''}</h5>
      </S.Top>
      <S.Content></S.Content>
    </S.Container>
  );
}
