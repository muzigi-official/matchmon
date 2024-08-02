import styled from 'styled-components';
import { colors } from '@/styles/colors';

export const TabsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
`;

export const TabButtonWrapper = styled.div`
  display: flex;

  margin-bottom: 16px;
`;

export const TabButton = styled.button<{ $isSelected: boolean }>`
  background-color: ${({ $isSelected }) => ($isSelected ? colors.primary : 'inherit')};
  color: ${({ $isSelected }) => ($isSelected ? colors.whiteText : '#000')};
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: ${({ $isSelected }) => ($isSelected ? 'default' : 'pointer')};
  pointer-events: ${({ $isSelected }) => ($isSelected ? 'none' : 'auto')};
  margin: 0 4px;

  &:hover {
    background-color: ${({ $isSelected }) => ($isSelected ? colors.primaryLight : 'none')};
  }
`;

export const TabContentContainer = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
`;
