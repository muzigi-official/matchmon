import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/redux/store';
import { useAppSelector } from '@/redux/hooks';

import { getParticipateTeams } from '@/api/joinTeamComp';

import MyButton from '@/components/button/MyButton';
import DataTable from '@/components/table/DataTable';

import * as S from '../Container.style';

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
  const selectedCompetition = useAppSelector((state: RootState) => state.competition.selectedCompetition);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
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
    navigate(`/admin/competition/participateTeams/${row.teamId}`);
  };

  return (
    <S.Container>
      <S.Top>
        <div>{selectedCompetition ? <h3>참가팀</h3> : <p>대회를 선택하세요.</p>}</div>
        <div>
          <MyButton variant='contained' onClick={splitGroup}>
            조짜기
          </MyButton>
          <MyButton variant='contained' onClick={() => setDialogOpen(true)}>
            팀 추가
          </MyButton>
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
      <div>dialog 열어줘 {isDialogOpen}</div>
    </S.Container>
  );
}
