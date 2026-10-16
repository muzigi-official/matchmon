import styled from 'styled-components';

import { colors } from '@/styles/colors';
import { radius, shadow, spacing } from '@/styles/tokens';
import { typography } from '@/styles/typography';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${spacing.lg};
`;

export const Modal = styled.div`
  width: 100%;
  max-width: 440px;
  background: ${colors.white};
  border-radius: ${radius.lg};
  box-shadow: ${shadow.lg};
  padding: ${spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
  max-height: 90vh;
  overflow-y: auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h3`
  font-size: ${typography.heading3.fontSize};
  font-weight: 800;
  margin: 0;
`;

export const Close = styled.button`
  background: none;
  color: ${colors.text.placeholder};
  font-size: 18px;
  cursor: pointer;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const Label = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${colors.text.sub};
`;

export const TeamTabs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.sm};
`;

export const TeamTab = styled.button<{ $active: boolean }>`
  padding: 10px;
  border-radius: ${radius.md};
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  background: ${({ $active }) => ($active ? colors.primary : colors.primaryLight)};
  color: ${({ $active }) => ($active ? colors.white : colors.primaryDark)};
`;

export const PlayerList = styled.div`
  border: 1px solid ${colors.border.basic};
  border-radius: ${radius.md};
  background: ${colors.background};
  max-height: 180px;
  overflow-y: auto;
  padding: ${spacing.xs};
`;

export const PlayerRow = styled.button<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  width: 100%;
  padding: 10px 12px;
  border-radius: ${radius.sm};
  cursor: pointer;
  text-align: left;
  background: ${({ $selected }) => ($selected ? colors.primaryLight : 'transparent')};

  &:hover {
    background: ${colors.hover};
  }
`;

export const Num = styled.span<{ $selected: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
  background: ${({ $selected }) => ($selected ? colors.primary : colors.border.basic)};
  color: ${({ $selected }) => ($selected ? colors.white : colors.text.sub)};
`;

export const PlayerLabel = styled.span<{ $selected: boolean }>`
  flex: 1;
  color: ${colors.text.basic};
  font-weight: ${({ $selected }) => ($selected ? '700' : '400')};
`;

export const Check = styled.span`
  color: ${colors.primary};
  font-weight: 700;
`;

export const InlineRow = styled.div`
  display: flex;
  gap: ${spacing.lg};
`;

export const MinuteInput = styled.input`
  width: 100px;
`;

export const EventPills = styled.div`
  display: flex;
  gap: ${spacing.sm};
  flex-wrap: wrap;
`;

export const EventPill = styled.button<{ $active: boolean; $warn?: boolean }>`
  padding: 10px 14px;
  border-radius: ${radius.md};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  background: ${({ $active, $warn }) =>
    $active ? ($warn ? colors.warning.default : colors.primary) : $warn ? colors.warning.lighter : colors.primaryLight};
  color: ${({ $active, $warn }) =>
    $active ? colors.white : $warn ? colors.warning.default : colors.primaryDark};
`;

export const Submit = styled.button`
  height: 48px;
  border-radius: ${radius.md};
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  background: ${colors.primary};
  color: ${colors.white};
  box-shadow: ${shadow.primary};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Empty = styled.div`
  padding: ${spacing.lg};
  text-align: center;
  color: ${colors.text.placeholder};
  font-size: 13px;
`;
