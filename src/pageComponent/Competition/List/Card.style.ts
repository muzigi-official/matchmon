import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';

export const Card = styled('div')`
  padding: 12px 0;
  margin: 12px;
  width: 280px;
  min-height: 220px;
`;

export const CardActionArea = styled('div')`
  display: flex;
  width: 100%;
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
  background-color: #468f6b;
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardContent = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 12px;
  padding: 16px 0;
`;

export const FabButton = styled(Fab)`
  position: absolute;
  bottom: -24px;
  right: 24px;
`;

export const CardFooter = styled('div')`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

export const FooterItem = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
