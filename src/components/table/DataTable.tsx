import * as React from 'react';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import * as S from './DataTable.style';

interface HeaderOptions {
  name: string;
  withImage?: string;
  type: string;
  isAction?: boolean;
}

interface Props {
  header: HeaderOptions[];
  rows: DialogData[];
  onClickModify: (row: DialogData) => void;
  onClickDelete: (row: DialogData) => void;
}

export default function DataTable(props: Props) {
  const { header, rows, onClickModify, onClickDelete } = props;
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
        <S.DataTableHeader>
          <TableRow>
            {header.map((header, index) => (
              <S.DataTableTh align='center' key={header.name + index}>
                <span>{header.name}</span>
              </S.DataTableTh>
            ))}
          </TableRow>
        </S.DataTableHeader>
        <S.DataTableTBody>
          {rows.map((row, index) => (
            <TableRow key={`${index}_row`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {header.map((header, index) => {
                if (header.isAction) {
                  return (
                    <S.DataTableTd key={header.name + index}>
                      <IconButton aria-label='moveDetailsPage' onClick={() => onClickModify(row)}>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton aria-label='DeleteItem' onClick={() => onClickDelete(row)}>
                        <DeleteIcon />
                      </IconButton>
                    </S.DataTableTd>
                  );
                }

                if (header.type === 'text') {
                  return <S.DataTableTd key={header.name + index}>{row[header.name]}</S.DataTableTd>;
                }
              })}
            </TableRow>
          ))}
        </S.DataTableTBody>
      </Table>
      {/*  FIXME: pageNation 아예 안 먹힘.  */}
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
    </S.DataTableContainer>
  );
}
