import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import DataTable from '@/components/mui/table/DataTable';

import BasicSelect from '@/components/common/Select/BasicSelect';
import { useCompetitionQuery } from '@/hooks/queries/useCompetitionQuery';
import { useMatchSchedulesQuery } from '@/hooks/queries/useMatchScheduleQuery';
import useCompetitionStore from '@/store/useCompetitionStore';

import * as S from './Container.style';

const tableHeader = [
  { headerName: '순서', property: 'order', type: 'string' },
  { headerName: '시간', property: 'dateTime', type: 'text' },
  { headerName: '팀명', property: 'teams', type: 'text' },
  { headerName: '경기결과', property: 'result', type: 'text' },
  { headerName: '결과입력상태', property: 'gameState', type: 'text' },
];

interface HeaderProperty {
  order: number;
  dateTime: string;
  teams: string;
  result: string;
  gameState: string;
}

export default function AdminMatchReport() {
  const navigate = useNavigate();
  const { selectedCompetition } = useCompetitionStore();

  const { data: competition } = useCompetitionQuery(selectedCompetition || 0);
  const { data: matchSchedules } = useMatchSchedulesQuery(selectedCompetition || 0);

  console.log(competition);

  const stadiums = Array.from(new Set(matchSchedules?.map(match => match.stadium))).map(stadium => ({
    value: stadium,
    text: stadium,
  }));
  stadiums.unshift({ value: 'all', text: '전체' });

  // 여기에 필요한 정보, 시간, 구장, homeTeam, awayTeam, result(결과),state(상태) => 결과와 상태만 추가되면 됨. 스케줄에서
  // state(상태: 완료 -> 경기 진행완료, 결과도 입력, 미입력 -> 경기는 진행 완료, but 결과 미입력, 대기 -> 경기가 아직 진행 되지 않음.)
  const rows = [
    { order: 1, dateTime: '10:00 ~ 10:15', teams: '눈누난나A vs 눈누난나B', result: 'Home 승', gameState: '완료' },
    { order: 2, dateTime: '10:20 ~ 10:35', teams: '양구시청 vs 장도리 FC', result: '무', gameState: '미입력' },
    { order: 3, dateTime: '10:40 ~ 10:55', teams: 'hobby FC vs 프라임 FC', result: '진행중', gameState: '-' },
    { order: 4, dateTime: '11:00 ~ 11:15', teams: '눈누난나B vs 프라임 FC', result: '-', gameState: '-' },
    { order: 5, dateTime: '11:20 ~ 11:35', teams: '장도리 FC vs 눈누난나A', result: '-', gameState: '-' },
    { order: 6, dateTime: '11:40 ~ 11:55', teams: '룰루랄라 vs Hobby FC', result: '-', gameState: '-' },
  ];
  const handleSelect = (option: ISelectProperty) => {
    console.log('select', option.value);
  };

  const hadleClickRow = (row: HeaderProperty) => {
    console.log('click', row);
    navigate(`/competition/results/${row.order}`);
  };

  return (
    <S.Container>
      <S.Top>
        <h3>경기 기록</h3>
      </S.Top>
      <S.Content>
        <S.Header>
          <span>{dayjs(competition?.startDate).format('YYYY/MM/DD')}</span>
          <BasicSelect label='구장' options={stadiums} name='stadium' value='all' onSelect={handleSelect}></BasicSelect>
        </S.Header>
        <DataTable header={tableHeader} rows={rows} onClickRow={hadleClickRow} />
      </S.Content>
    </S.Container>
  );
}
