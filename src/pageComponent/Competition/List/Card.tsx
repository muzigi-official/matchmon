import { useState } from 'react';

import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import RoomIcon from '@mui/icons-material/Room';
import CallIcon from '@mui/icons-material/Call';
import dayjs from 'dayjs';

import { CardFooter, CardActionArea, CardMedia, CardTop, Card } from './Card.style';

interface Props {
  competition: Competition;
  onClick: (competition: Competition) => void;
}
//TODO: 날짜가 지난 대회는 참가신청 못하고 위에 스타일로 종료된 대회임을 알려준다.
export default function CompetitionCard({ competition, onClick }: Props) {
  const [imageError, setImageError] = useState(false);
  const onErrorImg = () => {
    setImageError(true);
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
        </CardMedia>
        <CardFooter>
          <Grid container>
            <Grid xs={12} marginBottom={2}>
              <Typography variant='h5' textAlign={'center'}>
                {competition.name}
              </Typography>
            </Grid>
            <Grid xs={6}>
              <Box justifyContent={'center'} display={'flex'}>
                <RoomIcon />
              </Box>
              <Typography variant='body2' textAlign={'center'}>
                {competition.address}
              </Typography>
            </Grid>
            <Grid xs={6}>
              <Box justifyContent={'center'} display={'flex'}>
                <CallIcon />
              </Box>
              <Typography variant='body2' textAlign={'center'}>
                {competition.phoneNumber}
              </Typography>
            </Grid>
          </Grid>
        </CardFooter>
      </CardActionArea>
    </Card>
  );
}
