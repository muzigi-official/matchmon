import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

interface Props {
  header: string[];
  rows: any[];
  onClickModify: (row: any) => void;
  onClickDelete: (row: any) => void;
}

export default function BasicTable(props: Props) {
  const { header, rows, onClickModify, onClickDelete } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {header.map((headerName, index) => (
              <TableCell align='center' key={headerName + index}>
                {headerName}
              </TableCell>
            ))}
            <TableCell align='center'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={`${index}_row`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {header.map((headerName, index) => (
                <TableCell align='center' key={headerName + index}>
                  {row[headerName]}
                </TableCell>
              ))}
              <TableCell align='center' width='200px'>
                <Grid container spacing={2} display='flex' justifyItems={'center'}>
                  <Grid>
                    <Button size='small' onClick={() => onClickModify(row)} variant='outlined'>
                      수정
                    </Button>
                  </Grid>
                  <Grid>
                    <Button size='small' onClick={() => onClickDelete(row)} variant='contained'>
                      삭제
                    </Button>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
