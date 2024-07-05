import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getParticipateTeams } from '@/api/joinTeamComp';
import Button from '@/components/common/Button';
import DataTable from '@/components/mui/table/DataTable';
import useCompetitionStore from '@/store/useCompetitionStore';

import * as S from './Team.style';

const joinTeamHeader = [
  { headerName: '팀이름', property: 'name', withImage: 'emblem', type: 'text' },
  { headerName: '신청상태', property: 'participateState', type: 'text' },
  { headerName: '조', property: 'group', type: 'text' },
  { headerName: '', property: 'actions', type: 'button', isAction: true },
];

interface joinCompTeam {
  joinCompId: number;
  name: string;
  teamId: number;
  participateState: string;
  group: string;
}

export default function ParticipateTeams() {
  const navigate = useNavigate();
  const { selectedCompetition } = useCompetitionStore();
  // const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [rows, setRows] = useState<joinCompTeam[]>([]);

  useEffect(() => {
    getJoinTeams();
  }, []);

  const getJoinTeams = async () => {
    if (selectedCompetition) {
      const response = await getParticipateTeams(selectedCompetition);
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

  const splitGroup = () => {
    console.log('split group');
  };

  const deleteTeam = () => {
    console.log('delete');
  };

  const movePage = (row: joinCompTeam) => {
    navigate(`/competition/participateTeams/${row.joinCompId}`);
  };

  return (
    <S.Container>
      <S.Top>
        <div>
          {selectedCompetition ? (
            <h3>
              <span>참가팀</span>
              <span> : {rows.length}팀</span>
            </h3>
          ) : (
            <p>대회를 선택하세요.</p>
          )}
        </div>
        <div>
          <Button variant='contained' onClick={splitGroup}>
            조짜기
          </Button>
          {/* <Button variant='contained' onClick={() => setDialogOpen(true)}>
            팀 추가
          </Button> */}
        </div>
      </S.Top>
      <S.Content>
        <DataTable
          header={joinTeamHeader}
          rows={rows}
          onClickRow={(row: joinCompTeam) => {
            movePage(row);
          }}
          onClickDelete={deleteTeam}
        />
      </S.Content>
    </S.Container>
  );
}
