import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { flexPowerCenter } from '@/styles/mixins';

export const GroupCardContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 16px 12px;
  width: 30%;
  max-height: 280px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const GroupIconContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  width: 30%;
  max-height: 280px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const GroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
`;

export const GroupTeams = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

export const Team = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${colors.whiteText};
  border-radius: 8px;
  padding: 8px;
  font-size: 0.8125rem;

  span:first-child {
    width: 30px;
    height: 30px;
    background-color: #bdbdbd;
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
  color: white;
  background-color: #ff9493;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  ${flexPowerCenter}
  cursor: pointer;
`;
