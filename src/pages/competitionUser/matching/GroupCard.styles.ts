import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { flexPowerCenter } from '@/styles/mixins';

export const GroupCardContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  width: 33%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const GroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const GroupTeams = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Team = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  span:first-child {
    width: 36px;
    height: 36px;
    background-color: grey;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Emblem = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

export const AddTeamButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  background-color: #f5f5f5;
  border-radius: 8px;
  cursor: pointer;
`;

export const AddIcon = styled.div`
  font-size: 32px;
  background-color: ${colors.primary};
  color: white;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  ${flexPowerCenter}
`;

export const RemoveButton = styled.div`
  font-size: 24px;
  color: #f44336;
  cursor: pointer;
`;
