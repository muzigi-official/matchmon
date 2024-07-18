import { styled } from 'styled-components';
import { mediaQuery } from '@/styles/mediaQuery';

export const List = styled.ul`
  flex: 1;
  overflow-y: auto;
  padding: 8px;
  padding-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  ${mediaQuery.mobile} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;
