import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getParticipateTeams } from '@/api/joinTeamComp';
import { getCompetition } from '@/api/competition';
import DataTable from '@/components/mui/table/DataTable';

import * as S from './PageDetails.styles';

interface joinCompTeam {
  joinCompId: number;
  name: string;
  teamId: number;
  participateState: string;
  group: string;
}

const joinTeamHeader = [
  { headerName: '팀이름', property: 'name', withImage: 'emblem', type: 'text' },
  { headerName: '신청상태', property: 'participateState', type: 'text' },
  { headerName: '조', property: 'group', type: 'text' },
  { headerName: '', property: 'actions', type: 'button', isAction: true },
];

export default function AdminCompetitionDetail() {
  const { compId } = useParams();
  const [rows, setRows] = useState<joinCompTeam[]>([]);
  const [competition, setCompetition] = useState<ICompetition | null>(null);

  const getDetails = async () => {
    if (compId) {
      const response = await getCompetition(compId);
      console.log(response);
      setCompetition(response);
    }
  };

  const getJoinTeams = async () => {
    if (compId) {
      const response = await getParticipateTeams(compId);
      const parseTeams = response.map(item => {
        const { id, team, participateState } = item;
        return {
          joinCompId: id,
          name: team.name,
          teamId: team.id,
          participateState,
          group: '-',
        };
      });
      setRows(parseTeams);
    }
  };

  useEffect(() => {
    getDetails();
    getJoinTeams();
  }, []);

  return (
    <S.Container>
      <S.Top>
        <h3>
          <span>선택된 대회: {compId}</span>
          <span>참가팀</span>
          {/* <span> : 팀</span> */}
        </h3>
      </S.Top>
      <S.Content>
        <S.Left>
          <h1>{competition?.name}</h1>
          {/* <p>{competition ? competition : null}</p> */}
        </S.Left>
        <S.Right>
          <DataTable header={joinTeamHeader} rows={rows} />
        </S.Right>
      </S.Content>
    </S.Container>
  );
}
