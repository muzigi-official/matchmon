import { useNavigate } from 'react-router-dom';

import * as S from '../Container.style';
import BasicSelect from '@/components/select/BasicSelect';
import DataTable from '@/components/table/DataTable';

const dateSelect = [
  { value: '2024-04-20', text: '2024-04-20' },
  { value: '2024-04-21', text: '2024-04-21' },
];
const stadiumSelect = [
  { value: 'A구장', text: 'A구장' },
  { value: 'B구장', text: 'B구장' },
  { value: 'C구장', text: 'C구장' },
];

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
  const rows = [
    { order: 1, dateTime: '10:00 ~ 10:15', teams: '눈누난나A vs 눈누난나B', result: 'Home 승', gameState: '완료' },
    { order: 2, dateTime: '10:20 ~ 10:35', teams: '양구시청 vs 장도리 FC', result: '무', gameState: '미입력' },
    { order: 3, dateTime: '10:40 ~ 10:55', teams: 'hobby FC vs 프라임 FC', result: '진행중', gameState: '-' },
    { order: 4, dateTime: '11:00 ~ 11:15', teams: '눈누난나B vs 프라임 FC', result: '-', gameState: '-' },
    { order: 5, dateTime: '11:20 ~ 11:35', teams: '장도리 FC vs 눈누난나A', result: '-', gameState: '-' },
    { order: 6, dateTime: '11:40 ~ 11:55', teams: '룰루랄라 vs Hobby FC', result: '-', gameState: '-' },
  ];
  const handleSelect = (value: string) => {
    console.log('select', value);
  };

  const hadleClickRow = (row: HeaderProperty) => {
    console.log('click', row);
    navigate(`/admin/matchReport/${row.order}`);
  };

  return (
    <S.Container>
      <S.Top>
        <h3>경기 기록</h3>
      </S.Top>
      <S.Content>
        <S.ContentTop>
          <BasicSelect title='날짜' items={dateSelect} size='small' onSelect={handleSelect}></BasicSelect>
          <BasicSelect title='구장' items={stadiumSelect} size='small' onSelect={handleSelect}></BasicSelect>
        </S.ContentTop>
        <DataTable header={tableHeader} rows={rows} onClickRow={hadleClickRow} />
      </S.Content>
    </S.Container>
  );
}
