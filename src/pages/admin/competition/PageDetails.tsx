import { useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

// import { getCompetition, applyCompetition } from '@/api/competition';
// import { getParticipateTeams } from '@/api/removeFile/joinTeamComp';
// import { listTeam } from '@/api/team';
import { useCompetitionQuery, useApplyCompetitionMutation } from '@/hooks/queries/useCompetitionQuery';
import { useParticipateTeamsQuery } from '@/hooks/queries/useJoinCompTeamQuery';
import { useTeamListQuery } from '@/hooks/queries/useTeamQuery';

import Button from '@/components/common/Button';
import DataTable from '@/components/mui/table/DataTable';

import * as S from './PageDetails.styles';
import ApplyDialog from '@/components/competition/ApplyDialog';
import LeftPanel from './LeftPanel';

// interface joinCompTeam {
//   joinCompId: number;
//   name: string;
//   teamId: number;
//   participateState: string;
//   group: string;
// }

const joinTeamHeader = [
  { headerName: '팀이름', property: 'name', withImage: 'emblem', type: 'text' },
  { headerName: '신청상태', property: 'participateState', type: 'text' },
  { headerName: '조', property: 'group', type: 'text' },
  { headerName: '', property: 'actions', type: 'button', isAction: true },
];

export default function AdminCompetitionDetail() {
  const { compId } = useParams();
  const [competitionId, setCompetitionId] = useState<number>(0);
  const [isApplyDialog, setIsApplyDialog] = useState<boolean>(false);

  const { data: competitionData } = useCompetitionQuery(compId || 0);
  const { data: participateTeams } = useParticipateTeamsQuery(compId || 0);
  const { data: teamList } = useTeamListQuery(1, 100);

  const applyCompetitionMutation = useApplyCompetitionMutation();

  const competition = competitionData
    ? {
        ...competitionData,
        startDate: dayjs(competitionData.startDate).format('YYYY/MM/DD'),
        endDate: dayjs(competitionData.endDate).format('YYYY/MM/DD'),
      }
    : null;

  const rows = participateTeams
    ? participateTeams.map(item => ({
        joinCompId: item.id,
        name: item.team.name,
        teamId: item.team.id,
        participateState: item.participateState,
        group: '-',
      }))
    : [];

  const teams = teamList
    ? teamList.data
        .filter(team => !participateTeams?.some(pt => pt.team.id === team.id))
        .map(team => ({
          value: team.id,
          text: team.name,
        }))
    : [{ value: '', text: '팀 선택' }];

  const modify = () => {
    console.log('open modify dialog');
  };

  const clickApplyButton = (id: number) => {
    setCompetitionId(id);
    setIsApplyDialog(true);
  };

  const onSubmitHandler = async (formData: IApplyFormInput) => {
    const body = {
      ...formData,
      competitionId,
    };
    applyCompetitionMutation.mutate(body, {
      onSuccess: () => {
        setIsApplyDialog(false);
        // Re-fetch the participating teams after a successful application
        useParticipateTeamsQuery(compId || 0);
      },
    });
  };

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
        <S.Left>
          <LeftPanel info={competition} onClick={modify}></LeftPanel>
        </S.Left>
        <S.Right>
          <S.PanelAction>
            <div>{`${rows.length}팀 참여`}</div>
            <Button onClick={() => clickApplyButton(Number(compId))}>참가 신청</Button>
          </S.PanelAction>
          <DataTable header={joinTeamHeader} rows={rows} />
        </S.Right>
      </S.Content>
      <ApplyDialog
        teams={teams}
        open={isApplyDialog}
        onClose={() => {
          setIsApplyDialog(false);
        }}
        onConfirm={onSubmitHandler}
      />
    </S.Container>
  );
}
