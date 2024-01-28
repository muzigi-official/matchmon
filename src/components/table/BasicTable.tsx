import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Row {
  [key: string]: string;
}

interface Props {
  header: string[];
  rows: Row[];
}

export default function BasicTable(props: Props) {
  const { header, rows } = props;
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
