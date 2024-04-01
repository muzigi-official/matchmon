import * as React from 'react';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import * as S from './DataTable.style';

interface HeaderKey {
  [key: string]: string;
}

interface HeaderOptions {
  headerName: string;
  property: string;
  withImage?: string;
  type: string;
  isAction?: boolean;
}

interface Props<T> {
  header: HeaderOptions[];
  rows: T[];
  pageNations?: boolean;
  onClickRow?: (row: T) => void;
  onClickModify?: (row: T) => void;
  onClickDelete: (row: T) => void;
}

export default function DataTable<T>({ header, rows, pageNations = false, onClickModify, onClickDelete }: Props<T>) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <S.DataTableContainer>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <S.DataTableHeader className='select-none'>
          <TableRow>
            {header.map((header, index: number) => (
              <S.DataTableTh align='center' key={header.headerName + index}>
                <span>{header.headerName}</span>
              </S.DataTableTh>
            ))}
          </TableRow>
        </S.DataTableHeader>
        <S.DataTableTBody>
          {rows.map((row, index: number) => (
            <TableRow key={`${index}_row`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {header.map((header: HeaderOptions, index: number) => {
                if (header.isAction) {
                  return (
                    <S.DataTableTd key={`td_actions_${index}`}>
                      {onClickModify ? (
                        <IconButton aria-label='moveDetailsPage' onClick={() => onClickModify(row)}>
                          <VisibilityIcon />
                        </IconButton>
                      ) : (
                        ''
                      )}
                      {onClickDelete ? (
                        <IconButton aria-label='DeleteItem' onClick={() => onClickDelete(row)}>
                          <DeleteIcon />
                        </IconButton>
                      ) : (
                        ''
                      )}
                    </S.DataTableTd>
                  );
                }

                if (header.type === 'text' && row !== null) {
                  return <S.DataTableTd key={`td_${index}`}>{(row as HeaderKey)[header.property]}</S.DataTableTd>;
                }
              })}
            </TableRow>
          ))}
        </S.DataTableTBody>
      </Table>
      {/*  FIXME: pageNation 아예 안 먹힘.  */}
      {pageNations ? (
        <TablePagination
          className='border-bs'
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : (
        ''
      )}
    </S.DataTableContainer>
  );
}
