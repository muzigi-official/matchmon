import styled from 'styled-components';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';

export const DataTableContainer = styled(TableContainer)`
  margin: 0;
  padding: 0;
  background-color: white;
`;

export const DataTableHeader = styled(TableHead)`
  color: #2e263d;
  text-transform: uppercase;
`;

export const DataTableTh = styled(TableCell)`
  background-color: #f6f7fb;
  font-weight: 500;
  font-size: .8125rem;
  letter-spacing: .2px;
  line-height: 1.8462;
  text-align: start;

  &:first-of-type:not(:has(input[type=checkbox]) {
    padding-block: 0.5rem;
    padding-inline: 1.25rem 1rem;
  }
  &:first-of-type:has(input[type='checkbox']) {
    padding-inline-start: 0.6875rem;
  }

  &:not(:first-of-type),
  :not(:last-of-type) {
    padding-block: 0.5rem;
    padding-inline: 1rem;
  }

  &:last-of-type {
    padding-block: 0.5rem;
    padding-inline: 1rem 1.25rem;
  }
`;

export const DataTableTd = styled(TableCell)`
  font-size: 15px;
  grid-area: auto;
  line-height: 22.0006px;

  &:first-of-type:not(:has(input[type=checkbox]) {
    padding-block: 0.5rem;
    padding-inline: 1.25rem 1rem;
  }

  &:first-of-type:has(input[type='checkbox']) {
    padding-inline-start: 0.6875rem;
  }

  &:not(:first-of-type),
  :not(:last-of-type) {
    padding-block: 0.5rem;
    padding-inline: 1rem;
  }

  &:last-of-type {
    padding-block: 0.5rem;
    padding-inline: 1rem 1.25rem;
  }
`;
