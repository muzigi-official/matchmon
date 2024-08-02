import styled from 'styled-components';

export const TableContainer = styled.div`
  /* 
  overflow-x: auto; */
  width: 100%;

  margin: 0;
  padding: 0;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 18px;
  text-align: left;
  user-select: none;
`;

export const TableHeader = styled.thead`
  text-transform: uppercase;
  /* background-color: #f2f2f2; */

  th:not(:first-of-type):not(:last-of-type) {
    padding-block: 0.5rem;
    padding-inline: 1rem;
  }

  th:last-of-type {
    padding-block: 0.5rem;
    padding-inline: 1rem 1.25rem;
  }
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const TableHeaderCell = styled.th`
  padding: 12px 15px;
  background-color: #f6f7fb;
  border-bottom: 1px solid #ddd;

  font-weight: 500;
  font-size: 0.8125rem;
  letter-spacing: 0.2px;
  line-height: 1.8462;
  text-align: center;
  block-size: 56px;
`;

export const TableBody = styled.tbody`
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

export const TableCell = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  font-size: 0.9375rem;
  line-height: 1.4667;
  block-size: 50px;
`;
