import { useState } from 'react';
import dayjs from 'dayjs';

import { Box, Typography } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import CallIcon from '@mui/icons-material/Call';
import AddIcon from '@mui/icons-material/Add';

import { diffDate } from '@/utils/date';

import { FooterItem, CardFooter, CardContent, FabButton, CardActionArea, CardMedia, CardTop, Card } from './Card.style';

interface Props {
  competition: Competition;
  onClick: (competition: Competition) => void;
  onClickApply: (id: number) => void;
}
//TODO: 날짜가 지난 대회는 참가신청 못하고 위에 스타일로 종료된 대회임을 알려준다.
export default function CompetitionCard({ competition, onClick, onClickApply }: Props) {
  const [imageError, setImageError] = useState(false);
  const onErrorImg = () => {
    setImageError(true);
  };

  const now = dayjs().format('YYYY-MM-DD');
  const duration = diffDate(competition.startDate, now);

  const clickAddButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    onClickApply(Number(competition.id));
  };

  return (
    <Card>
      <CardActionArea onClick={() => onClick(competition)}>
        <CardMedia>
          <CardTop className=''>{dayjs(competition.startDate).format(`YYYY.MM.DD`)}</CardTop>
          {imageError ? (
            <img src='/icon_trophy.png' alt='대회 기본 이미지' />
          ) : (
            <img src={competition.poster} alt='대회 포스터' height={190} onError={onErrorImg} />
          )}
          {duration <= 0 ? (
            <FabButton color='warning' aria-label='add' onClick={clickAddButton}>
              <AddIcon />
            </FabButton>
          ) : (
            ''
          )}
        </CardMedia>
        <CardContent>
          <Typography variant='h5' textAlign={'center'}>
            {competition.name}
          </Typography>
        </CardContent>
        <CardFooter>
          <FooterItem>
            <RoomIcon />
            <Typography variant='body2' textAlign={'center'}>
              {competition.address}
            </Typography>
          </FooterItem>
          <FooterItem>
            <Box justifyContent={'center'} display={'flex'}>
              <CallIcon />
            </Box>
            <Typography variant='body2' textAlign={'center'}>
              {competition.phoneNumber}
            </Typography>
          </FooterItem>
        </CardFooter>
      </CardActionArea>
    </Card>
  );
}
