import { styled } from '@mui/material/styles';

export const Card = styled('div')`
  padding: 12px 0;
  margin: 12px;
  width: 300px;
  min-height: 220px;
`;

export const CardActionArea = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CardTop = styled('div')`
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: #ffd07b;
  border-radius: 16px;
  padding: 4px 12px;
`;

export const CardMedia = styled('div')`
  position: relative;
  background-color: #524e7f;
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardFooter = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
