import styled from 'styled-components';
import { colors } from '@/styles/colors';

export const Container = styled.div`
  display: flex;
`;

export const PaginationUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const PaginationLi = styled.li`
  margin: 2px;
`;

export const PaginationSpan = styled.span`
  color: ${colors.black};
`;
