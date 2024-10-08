import styled from 'styled-components';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import { TableBody, TableRow } from '@mui/material';

export const DataTableContainer = styled(TableContainer)`
  margin: 0;
  padding: 0;
`;

export const DataTableHeader = styled(TableHead)`
  text-transform: uppercase;

  th:first-of-type:has(input[type='checkbox']) {
    padding-inline-start: 0.6875rem;
  }

  th:first-of-type:not(:has(input[type='checkbox'])) {
    padding-block: 0.5rem;
    padding-inline: 1.25rem 1rem;
  }

  th:not(:first-of-type):not(:last-of-type) {
    padding-block: 0.5rem;
    padding-inline: 1rem;
  }

  th:last-of-type {
    padding-block: 0.5rem;
    padding-inline: 1rem 1.25rem;
  }
`;

export const DataTableTh = styled(TableCell)`
  background-color: #f6f7fb;

  font-weight: 500;
  font-size: 0.8125rem;
  letter-spacing: 0.2px;
  line-height: 1.8462;
  text-align: center;
  block-size: 56px;
`;

export const DataTableTBody = styled(TableBody)`
  td:first-of-type:has(input[type='checkbox']) {
    padding-inline-start: 0.6875rem;
    text-align: center;
  }

  td:first-of-type:not(:has(input[type='checkbox'])) {
    padding-block: 0.5rem;
    padding-inline: 1.25rem 1rem;
    text-align: center;
  }

  td:not(:first-of-type):not(:last-of-type) {
    padding-block: 0.5rem;
    padding-inline: 1rem;
    text-align: center;
  }

  td:last-of-type {
    padding-block: 0.5rem;
    padding-inline: 1rem 1.25rem;
    text-align: center;
  }
`;

export const Row = styled(TableRow)`
  &:hover {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    cursor: pointer;
  }
`;

export const DataTableTd = styled(TableCell)`
  font-size: 0.9375rem;
  line-height: 1.4667;
  block-size: 50px;
`;
