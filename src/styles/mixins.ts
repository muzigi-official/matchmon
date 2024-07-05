import { css } from 'styled-components';

export const containerMixin = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 - var(--gnb-width));
  padding: 12px 0;
`;
