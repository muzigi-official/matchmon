import styled from 'styled-components';
import { dotPulse } from '@/styles/animations';
import { colors } from '@/styles/colors';

export const LoadingDotsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Dot = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${colors.primary};
  margin: 0 5px;
  animation: ${dotPulse} 2s infinite ease-in-out;

  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;
