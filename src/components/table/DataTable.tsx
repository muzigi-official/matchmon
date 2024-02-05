import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';

import * as S from './DataTable.style';

interface Row {
  [key: string]: string;
}

interface Props {
  header: string[];
  rows: Row[];
}

export default function DataTable(props: Props) {
  const { header, rows } = props;
  return (
    <S.DataTableContainer>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <S.DataTableHeader>
          <TableRow>
            {header.map((headerName, index) => (
              <S.DataTableTh align='center' key={headerName + index}>
                <span>{headerName}</span>
              </S.DataTableTh>
            ))}
          </TableRow>
        </S.DataTableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={`${index}_row`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {header.map((headerName, index) => (
                <S.DataTableTd key={headerName + index}>{row[headerName]}</S.DataTableTd>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </S.DataTableContainer>
  );
}
