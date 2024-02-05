import * as React from 'react';
import DataTable from '@/components/table/DataTable';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import * as S from './TeamPage.style';

const headerSample = ['name', 'emblem', 'location', 'gender'];

function createData(name: string, emblem: string, location: string, gender: Gender) {
  return { name, emblem, location, gender };
}

const rows = [
  createData('FS NNNN', '', '서울', 'Female'),
  createData('FS 하비', '', '서울', 'Female'),
  createData('KING FC', '', '서울', '혼성'),
  createData('FC 부산', '', '부산', 'Male'),
  createData('먼데 FC', '', '인천', 'Female'),
  createData('FS 우르르', '', '안산', 'Female'),
];

export default function TeamPage() {
  return (
    <S.PageContainer>
      <S.PageHeader>
        <h4> Team </h4>
      </S.PageHeader>
      <Stack>
        <h5> 필터 영역 </h5>
      </Stack>
      <S.PageContent>
        <S.ActionRows>
          <Button variant='contained'>추가</Button>
        </S.ActionRows>
        <DataTable header={headerSample} rows={rows} />
      </S.PageContent>
    </S.PageContainer>
  );
}
