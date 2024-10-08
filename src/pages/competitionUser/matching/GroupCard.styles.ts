import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { flexPowerCenter } from '@/styles/mixins';
import { mediaQuery } from '@/styles/mediaQuery';
import { jelloHorizontal, jelloHorizontalWebKit, bounce } from '@/styles/animations';

export const GroupCardContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 16px 12px;
  width: 30%;
  max-height: 294px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: auto; /* Adjust height to auto */

  &:hover {
    animation: ${bounce} 0.3s;
    cursor: pointer;
  }

  ${mediaQuery.mobile} {
    width: 100%;
  }
`;

export const GroupIconContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  width: 30%;
  max-height: 294px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto; /* Adjust height to auto */

  ${mediaQuery.mobile} {
    width: 100%;
  }
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
  height: auto; /* Adjust height to auto */
  overflow: visible; /* Ensure content is not cut off */
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

  &:hover {
    -webkit-animation: ${jelloHorizontalWebKit} 0.9s both;
    animation: ${jelloHorizontal} 0.9s both;
  }
`;

export const NoTeamsMessage = styled.div`
  width: 100%;
  text-align: center;
  color: #999;
  font-size: 14px;
  margin-top: 16px;
`;
