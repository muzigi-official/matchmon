import { css } from 'styled-components';

export const containerBasicCol = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px 0;
`;

export const containerFlexCol = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px 0;
`;

export const containerFlexRow = css`
  display: flex;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 - var(--gnb-width));
  padding: 12px 0;
  gap: 12px;
`;

export const flexPowerCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
