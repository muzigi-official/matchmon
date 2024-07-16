import styled from 'styled-components';

export const GroupListContainer = styled.div`
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 18px;
  width: 100%;
  height: auto; /* Adjust height to auto */
  overflow: visible; /* Ensure content is not cut off */
`;
