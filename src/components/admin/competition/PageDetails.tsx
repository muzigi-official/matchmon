import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import { getParticipateTeams } from '@/api/joinTeamComp';
import { getCompetition } from '@/api/competition';
import Button from '@/components/common/Button';
import DataTable from '@/components/mui/table/DataTable';
import { getCompetitionStatus } from '@/utils/date';

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

  const status = getCompetitionStatus(competition?.startDate, competition?.endDate);

  const getDetails = async () => {
    if (compId) {
      const response = await getCompetition(compId);
      console.log(response);
      setCompetition({
        ...response,
        startDate: dayjs(response.startDate).format('YYYY/MM/DD'),
        endDate: dayjs(response.endDate).format('YYYY/MM/DD'),
      });
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

  const modify = () => {
    console.log('open modify dialog');
  };

  useEffect(() => {
    getDetails();
    getJoinTeams();
  }, []);

  return (
    <S.Container>
      <S.Top>
        <S.Title>
          <a href='/admin/competitions'>전체대회</a>
          <span>/</span>
          <span>{competition?.name}</span>
        </S.Title>
      </S.Top>
      <S.Content>
        <S.LeftPanel>
          {competition ? (
            <>
              <S.NameContainer>
                <S.Name>{competition.name}</S.Name>
                <S.StatusBadge status={status}>{status}</S.StatusBadge>
              </S.NameContainer>
              <S.Info>
                {competition.startDate === competition.endDate
                  ? `${competition.startDate}`
                  : `${competition.startDate} ~ ${competition.endDate}`}
              </S.Info>
              <S.Info>{competition.address}</S.Info>

              <S.Details>
                <S.DetailTitle>Details</S.DetailTitle>
                <S.DetailItem>
                  <span>담당자:</span> 관리자
                </S.DetailItem>
                <S.DetailItem>
                  <span>주최사:</span> {competition.organizer}
                </S.DetailItem>
                <S.DetailItem>
                  <span>Contact:</span> {competition.phoneNumber}
                </S.DetailItem>
              </S.Details>

              <S.ButtonContainer>
                <Button color='primary' onClick={modify}>
                  Edit
                </Button>
              </S.ButtonContainer>
            </>
          ) : (
            ''
          )}
        </S.LeftPanel>
        <S.RightPanel>
          <DataTable header={joinTeamHeader} rows={rows} />
        </S.RightPanel>
      </S.Content>
    </S.Container>
  );
}
