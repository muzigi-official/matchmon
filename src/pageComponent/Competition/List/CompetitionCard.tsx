import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import RoomIcon from '@mui/icons-material/Room';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import CallIcon from '@mui/icons-material/Call';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface Props {
  competition: Competition;
}

export default function CompetitionCard({ competition }: Props) {
  return (
    <Card sx={{ margin: '12px', width: '300px', minHeight: '220px' }} onClick={event => {}}>
      <CardMedia component='img' image={competition.poster} height={190} />
      <CardContent>
        <Grid container>
          <Grid xs={12} marginBottom={2}>
            <Typography variant='h5' textAlign={'center'}>
              {competition.name}
            </Typography>
          </Grid>
          <Grid xs={4}>
            <Box justifyContent={'center'} display={'flex'}>
              <RoomIcon />
            </Box>
            <Typography variant='body2' textAlign={'center'}>
              {competition.address}
            </Typography>
          </Grid>
          <Grid xs={4}>
            <Box justifyContent={'center'} display={'flex'}>
              <CalendarMonthIcon />
            </Box>
            <Typography variant='body2' textAlign={'center'}>
              {competition.start_date}
            </Typography>
          </Grid>
          <Grid xs={4}>
            <Box justifyContent={'center'} display={'flex'}>
              <CallIcon />
            </Box>
            <Typography variant='body2' textAlign={'center'}>
              010-8576-2072
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
