import { useNavigate } from 'react-router-dom';

import DataTable from '@/components/mui/table/DataTable';

import Button from '@/components/common/Button';
import Loading from '@/components/common/Loading';
import { useParticipateTeamsQuery } from '@/hooks/queries/useJoinCompTeamQuery';
import useCompetitionStore from '@/store/useCompetitionStore';

import * as S from './Team.styles';

const joinTeamHeader = [
  { headerName: '팀이름', property: 'name', withImage: 'emblem', type: 'text' },
  { headerName: '신청상태', property: 'participateState', type: 'text' },
  { headerName: '조', property: 'group', type: 'text' },
  { headerName: '', property: 'actions', type: 'button', isAction: true },
];

export default function ParticipateTeams() {
  const navigate = useNavigate();
  const { selectedCompetition } = useCompetitionStore();

  const {
    data: teamsData = [],
    error: teamsError,
    isLoading: teamsLoading,
  } = useParticipateTeamsQuery(selectedCompetition || 0);

  const teams = teamsData.map(item => {
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

  const splitGroup = () => {
    navigate(`/competition/participateTeams/matching`);
  };

  const deleteTeam = (row: IJoinTeamComps) => {
    console.log('delete', row);
  };

  const movePage = (row: IJoinTeamComps) => {
    navigate(`/competition/participateTeams/${row.joinCompId}`);
  };

  if (teamsLoading) return <Loading />;
  if (teamsError) return <div>Error: {teamsError.message}</div>;

  return (
    <S.Container>
      <S.Top>
        <div>
          {selectedCompetition ? (
            <h3>
              <span>참가팀</span>
              <span> : {teams.length}팀</span>
            </h3>
          ) : (
            <p>대회를 선택하세요.</p>
          )}
        </div>
        <div>
          <Button variant='contained' onClick={splitGroup}>
            조짜기
          </Button>
        </div>
      </S.Top>
      <S.Content>
        <DataTable
          header={joinTeamHeader}
          rows={teams}
          onClickRow={(row: IJoinTeamComps) => {
            movePage(row);
          }}
          onClickDelete={(row: IJoinTeamComps) => deleteTeam(row)}
        />
      </S.Content>
    </S.Container>
  );
}
