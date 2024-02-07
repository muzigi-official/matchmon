import * as React from 'react';
import DataTable from '@/components/table/DataTable';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import './teamPage.css';

const headerSample = [
  { name: 'name', withImage: 'emblem', type: 'text' },
  { name: 'location', type: 'text' },
  { name: 'gender', type: 'text' },
  { name: 'characteristic', type: 'text' },
  { name: 'actions', type: 'button', isAction: true },
];

function createData(name: string, emblem: string, location: string, gender: Gender, characteristic: string) {
  return { name, emblem, location, gender, characteristic };
}

const rows = [
  createData('FS NNNN', '', '서울', 'F', '순수 아마추어'),
  createData('FS 하비', '', '서울', 'F', '패싱플레이'),
  createData('KING FC', '', '서울', 'A', '피지컬최고'),
  createData('FC 부산', '', '부산', 'M', '순수 아마추어'),
  createData('먼데 FC', '', '인천', 'F', '사냥꾼'),
  createData('FS 우르르', '', '안산', 'F', '취미'),
];
/* TODO:FIXME:
  - 필터 컴포넌트 생성
*/

export default function TeamPage() {
  return (
    <div className='page__container'>
      <div className='page__header'>
        <h4> Team </h4>
      </div>
      <div className='page__filter'>
        <p> 필터 영역 </p>
      </div>
      <Paper className='page__content' variant='outlined' square={false}>
        <div className='actions'>
          <Button variant='contained'>추가</Button>
        </div>
        <DataTable header={headerSample} rows={rows} />
      </Paper>
    </div>
  );
}
