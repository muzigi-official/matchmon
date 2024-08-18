import styled from 'styled-components';
import { colors } from '@/styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding: 16px;
  background-color: #f0f0f0;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TabButton = styled.button<{ selected: boolean }>`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: ${props => (props.selected ? colors.primary : '#cccccc')};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 8px;

  &:last-child {
    margin-right: 0;
  }
`;

export const ResetButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: ${colors.error.default};
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export const PlayerListContainer = styled.div`
  display: flex;
  flex-grow: 1;
  margin: 16px 0;
  overflow-y: auto;
`;

export const PlayerList = styled.div<{ visible: boolean }>`
  flex: 1;
  display: ${props => (props.visible ? 'block' : 'none')};
`;

export const PlayerItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 8px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const PlayerName = styled.span`
  font-size: 16px;
`;

export const GoalControl = styled.div`
  display: flex;
  align-items: center;
`;

export const GoalButton = styled.button`
  padding: 5px 10px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  background-color: ${colors.primary};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 4px;
`;

export const GoalCount = styled.span`
  font-size: 16px;
  margin: 0 8px;
`;

export const ScoreBoard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 16px;
  font-size: 48px;
  font-weight: bold;
  border-top: 2px solid #ccc;
`;
