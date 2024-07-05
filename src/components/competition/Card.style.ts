import { styled } from 'styled-components';
import Fab from '@mui/material/Fab';

export const Card = styled.div`
  padding: 12px 0;
  margin: 12px;
  width: 280px;
  min-height: 220px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  &:hover {
    box-shadow:
      rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    cursor: pointer;
  }
`;

export const CardActionArea = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CardTop = styled.div`
  position: absolute;
  top: 12px;
  left: 8px;
  background-color: #ffd07b;
  border-radius: 16px;
  padding: 4px 12px;
`;

export const CardMedia = styled.div`
  position: relative;
  background-color: #468f6b;
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardContent = styled.div`
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

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 12px;
`;

export const FooterItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
