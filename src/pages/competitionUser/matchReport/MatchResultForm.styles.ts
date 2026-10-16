import styled from 'styled-components';

import { colors } from '@/styles/colors';
import { radius, shadow, spacing } from '@/styles/tokens';
import { typography } from '@/styles/typography';

export const Card = styled.section`
  background: ${colors.white};
  border-radius: ${radius.lg};
  box-shadow: ${shadow.md};
  padding: ${spacing.xl};
`;

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
`;

// ===== 스코어보드 =====
export const ScoreBoard = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: ${spacing.md};
`;

export const StateBadge = styled.div<{ $state: TMatchResultState }>`
  justify-self: center;
  grid-column: 1 / -1;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  border-radius: ${radius.full};
  font-size: ${typography.caption.fontSize};
  font-weight: 700;
  background: ${({ $state }) =>
    $state === 'COMPLETED' ? colors.primaryLight : $state === 'PENDING_RESULT' ? colors.warning.lighter : colors.cancel.lighter};
  color: ${({ $state }) =>
    $state === 'COMPLETED' ? colors.primaryDark : $state === 'PENDING_RESULT' ? colors.warning.default : colors.text.sub};
`;

export const TeamSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.sm};
`;

export const TeamName = styled.span`
  font-size: ${typography.heading3.fontSize};
  font-weight: 700;
  color: ${colors.text.basic};
`;

export const ScoreControl = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
`;

export const StepButton = styled.button<{ $primary?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: ${radius.md};
  font-size: 20px;
  font-weight: 800;
  cursor: pointer;
  background: ${({ $primary }) => ($primary ? colors.primary : colors.primaryLight)};
  color: ${({ $primary }) => ($primary ? colors.white : colors.primaryDark)};
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ScoreValue = styled.span`
  font-size: 40px;
  font-weight: 800;
  color: ${colors.text.basic};
  min-width: 48px;
  text-align: center;
`;

export const Colon = styled.span`
  font-size: 34px;
  font-weight: 800;
  color: ${colors.border.darken};
`;

// ===== 옵션 (상태/승부차기) =====
export const OptionRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${spacing.xl};
`;

export const OptionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const OptionLabel = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${colors.text.sub};
`;

export const Pills = styled.div`
  display: flex;
  gap: ${spacing.sm};
`;

export const Pill = styled.button<{ $active: boolean }>`
  padding: 8px 18px;
  border-radius: ${radius.full};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  background: ${({ $active }) => ($active ? colors.primary : colors.primaryLight)};
  color: ${({ $active }) => ($active ? colors.white : colors.primaryDark)};
`;

export const PenaltyScores = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  margin-top: ${spacing.sm};
`;

// ===== 득점 기록 =====
export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.md};
`;

export const SectionTitle = styled.h3`
  font-size: ${typography.heading3.fontSize};
  font-weight: 700;
  margin: 0;
`;

export const GoalList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const GoalItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  padding: 12px 4px;
  border-bottom: 1px solid ${colors.border.basic};

  &:last-child {
    border-bottom: none;
  }
`;

export const TeamDot = styled.span<{ $home: boolean }>`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: ${({ $home }) => ($home ? colors.primary : colors.secondary)};
  flex-shrink: 0;
`;

export const Minute = styled.span`
  font-weight: 700;
  color: ${colors.text.basic};
  min-width: 36px;
`;

export const PlayerName = styled.span`
  color: ${colors.text.basic};
  flex: 1;
`;

export const TeamTag = styled.span<{ $home: boolean }>`
  padding: 3px 10px;
  border-radius: ${radius.full};
  font-size: 11px;
  font-weight: 700;
  background: ${({ $home }) => ($home ? colors.primaryLight : colors.secondaryLight)};
  color: ${({ $home }) => ($home ? colors.primaryDark : colors.secondaryDark)};
`;

export const OgTag = styled.span`
  padding: 3px 8px;
  border-radius: ${radius.full};
  font-size: 11px;
  font-weight: 700;
  background: ${colors.warning.lighter};
  color: ${colors.warning.default};
`;

export const DeleteGoalButton = styled.button`
  background: none;
  color: ${colors.error.default};
  font-size: 16px;
  cursor: pointer;
  padding: 4px 8px;
`;

export const AddGoalButton = styled.button`
  padding: 8px 16px;
  border-radius: ${radius.md};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  background: ${colors.primary};
  color: ${colors.white};
`;

export const Empty = styled.div`
  padding: ${spacing.lg};
  text-align: center;
  color: ${colors.text.placeholder};
`;

export const SaveButton = styled.button`
  width: 100%;
  height: 52px;
  border-radius: ${radius.md};
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  background: ${colors.primary};
  color: ${colors.white};
  box-shadow: ${shadow.primary};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const PenaltyInput = styled.input`
  width: 56px;
  text-align: center;
`;
