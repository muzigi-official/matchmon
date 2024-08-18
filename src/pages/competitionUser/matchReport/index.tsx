import { useState } from 'react';
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
  { headerName: '경기장', property: 'stadium', type: 'text' },
  { headerName: '홈팀', property: 'homeTeam', type: 'text' },
  { headerName: '어웨이팀', property: 'awayTeam', type: 'text' },
  { headerName: '경기결과', property: 'result', type: 'text' },
  { headerName: '결과입력상태', property: 'gameState', type: 'text' },
];

interface HeaderProperty {
  id?: number;
  order: number;
  dateTime: string;
  stadium: string;
  homeTeam: string;
  awayTeam: string;
  result: string;
  gameState: string;
}

export default function AdminMatchReport() {
  const navigate = useNavigate();
  const { selectedCompetition } = useCompetitionStore();
  const [selectedStadium, setSelectedStadium] = useState<string | number>('all');

  const { data: competition } = useCompetitionQuery(selectedCompetition || 0);
  const { data: matchSchedules } = useMatchSchedulesQuery(selectedCompetition || 0);

  const stadiums = Array.from(new Set(matchSchedules?.map(match => match.stadium))).map(stadium => ({
    value: stadium,
    text: stadium,
  }));
  stadiums.unshift({ value: 'all', text: '전체' });

  // 여기에 필요한 정보, 시간, 구장, homeTeam, awayTeam, result(결과),state(상태) => 결과와 상태만 추가되면 됨. 스케줄에서
  // state(상태: 완료 -> 경기 진행완료, 결과도 입력, 미입력 -> 경기는 진행 완료, but 결과 미입력, 대기 -> 경기가 아직 진행 되지 않음.)
  const rows =
    matchSchedules?.map((match, index) => {
      return {
        id: match.id,
        order: index + 1,
        dateTime: match.matchTime || '-',
        stadium: match.stadium,
        homeTeam: match.homeTeamName || '-',
        awayTeam: match.awayTeamName || '-',
        result: '',
        gameState: '미입력',
      };
    }) || [];

  // 선택된 구장에 따른 필터링
  const filteredRows = selectedStadium === 'all' ? rows : rows.filter(row => row.stadium === selectedStadium);

  const handleSelect = (option: ISelectProperty) => {
    setSelectedStadium(option.value); // 선택된 구장을 상태로 업데이트
  };

  const hadleClickRow = (row: HeaderProperty) => {
    console.log('click', row);
    navigate(`/competition/results/${row.id}`);
  };

  return (
    <S.Container>
      <S.Top>
        <h3>경기 기록</h3>
      </S.Top>
      <S.Content>
        <S.Header>
          <span>{dayjs(competition?.startDate).format('YYYY/MM/DD')}</span>
          <BasicSelect
            label='구장'
            options={stadiums}
            name='stadium'
            value={selectedStadium}
            onSelect={handleSelect}
          ></BasicSelect>
        </S.Header>
        <DataTable header={tableHeader} rows={filteredRows} onClickRow={hadleClickRow} />
      </S.Content>
    </S.Container>
  );
}
