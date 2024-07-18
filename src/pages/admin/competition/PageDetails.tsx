import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import { getCompetition, applyCompetition } from '@/api/competition';
import { getParticipateTeams } from '@/api/joinTeamComp';
import { listTeam } from '@/api/team';
import Button from '@/components/common/Button';
import DataTable from '@/components/mui/table/DataTable';

import * as S from './PageDetails.styles';
import ApplyDialog from '@/components/competition/ApplyDialog';
import LeftPanel from './LeftPanel';

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
  const [competitionId, setCompetitionId] = useState<number>(0);
  const [isApplyDialog, setIsApplyDialog] = useState<boolean>(false);

  const [teams, setTeams] = useState<ISelectProperty[]>([{ value: '', text: '팀 선택' }]);
  const [joinedTeamIds, setJoinedTeamIds] = useState<number[]>([]); // 참여한 팀 ID 목록

  const getDetails = async () => {
    if (compId) {
      const response = await getCompetition(compId);
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
      const joinedIds = response.map(item => item.team.id);
      console.log(joinedIds);
      setJoinedTeamIds(joinedIds); // 참여한 팀 ID 목록 설정
    }
  };

  const getAllTeams = async () => {
    const response = await listTeam(1, 100);
    const selectOptions = response.data
      .filter(team => !joinedTeamIds.includes(team.id)) // 참여한 팀 필터링
      .map(team => {
        return {
          value: team.id,
          text: team.name,
        };
      });
    setTeams(selectOptions);
  };

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
    const response = await applyCompetition(body);
    if (response === '등록 성공') {
      setIsApplyDialog(false);
      getJoinTeams();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getDetails();
      await getJoinTeams();
    };

    fetchData();
  }, [compId]);

  useEffect(() => {
    if (joinedTeamIds.length > 0) {
      getAllTeams(); // 참여한 팀 ID가 설정된 후 팀 목록 불러오기
    }
  }, [joinedTeamIds]);

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
            <div>{`${joinedTeamIds.length}팀 참여`}</div>
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
