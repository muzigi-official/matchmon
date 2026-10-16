import styled from 'styled-components';

import { colors } from '@/styles/colors';
import { radius, shadow, spacing } from '@/styles/tokens';
import { typography } from '@/styles/typography';

export const Container = styled.div`
  padding: ${spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${spacing.xl};
`;

export const Title = styled.h2`
  font-size: ${typography.heading2.fontSize};
  font-weight: ${typography.heading2.fontWeight};
  margin: 0;
`;

export const SectionTitle = styled.h3`
  font-size: ${typography.heading3.fontSize};
  font-weight: ${typography.heading3.fontWeight};
  margin: 0 0 ${spacing.md};
`;

export const Section = styled.section`
  background: ${colors.white};
  border-radius: ${radius.lg};
  box-shadow: ${shadow.md};
  padding: ${spacing.xl};
`;

export const Tabs = styled.div`
  display: flex;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.lg};
  flex-wrap: wrap;
`;

export const Tab = styled.button<{ $active: boolean }>`
  padding: 8px 18px;
  border-radius: ${radius.full};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  background: ${({ $active }) => ($active ? colors.primary : colors.primaryLight)};
  color: ${({ $active }) => ($active ? colors.white : colors.primaryDark)};
  transition: background 0.2s ease;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

export const Th = styled.th`
  text-align: center;
  padding: 10px 8px;
  color: ${colors.text.sub};
  font-weight: 600;
  border-bottom: 1px solid ${colors.border.basic};
  white-space: nowrap;
`;

export const Td = styled.td<{ $strong?: boolean }>`
  text-align: center;
  padding: 12px 8px;
  color: ${({ $strong }) => ($strong ? colors.text.basic : colors.text.sub)};
  font-weight: ${({ $strong }) => ($strong ? '700' : '400')};
  border-bottom: 1px solid ${colors.border.basic};
`;

export const TeamCell = styled.td`
  text-align: left;
  padding: 12px 8px;
  font-weight: 700;
  color: ${colors.text.basic};
  border-bottom: 1px solid ${colors.border.basic};
`;

export const RankBadge = styled.span<{ $top?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: ${radius.full};
  font-weight: 700;
  font-size: 13px;
  background: ${({ $top }) => ($top ? colors.primary : colors.cancel.lighter)};
  color: ${({ $top }) => ($top ? colors.white : colors.text.sub)};
`;

export const Empty = styled.div`
  padding: ${spacing.xl};
  text-align: center;
  color: ${colors.text.placeholder};
`;
