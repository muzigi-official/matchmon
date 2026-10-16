import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';

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
  onClickRow?: (row: T) => void;
  onClickModify?: (row: T) => void;
  onClickDelete?: (row: T) => void;
}

export default function DataTable<T>({ header, rows, onClickRow, onClickModify, onClickDelete }: Props<T>) {
  return (
    <S.DataTableContainer>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <S.DataTableHeader className='select-none'>
          <TableRow>
            {header.map((headerItem, headerIndex: number) => (
              <S.DataTableTh align='center' key={headerItem.property + headerIndex}>
                <span>{headerItem.headerName}</span>
              </S.DataTableTh>
            ))}
          </TableRow>
        </S.DataTableHeader>
        <S.DataTableTBody>
          {rows.map((row, index: number) => (
            <S.Row
              key={`${index}_row`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => onClickRow && onClickRow(row)}
            >
              {header.map((cell: HeaderOptions, cellIndex: number) => {
                if (cell.isAction) {
                  return (
                    <S.DataTableTd key={`td_actions_${cellIndex}`}>
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

                if (cell.type !== 'button' && row !== null) {
                  return <S.DataTableTd key={`td_${cellIndex}`}>{(row as HeaderKey)[cell.property]}</S.DataTableTd>;
                }

                return null;
              })}
            </S.Row>
          ))}
        </S.DataTableTBody>
      </Table>
    </S.DataTableContainer>
  );
}
