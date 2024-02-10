import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

interface Props {
  player?: Player;
}

export default function PlayerCard({ player }: Props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component='img'
        height='194'
        image={
          player?.picture ||
          'https://lh3.googleusercontent.com/proxy/he5xg1H9UsO6whXyXGhZVJpcLZPXwEGhGLCqjGEP7kTIqHdXFuCA732ND2e7HdlaH4tfagHGL8njnhxc9nnOZXttT73Gw9fualULOodJ6WobyZyv1eIrPzU1HQ8'
        }
        alt='선수 프로필사진'
      />
      <CardContent>
        <Grid container>
          <Grid xs={3}>
            <Typography variant='subtitle2' color='text.secondary'>
              이름
            </Typography>
          </Grid>
          <Grid xs={9}>
            <Typography variant='body2' color='text.secondary'>
              {player?.name || '김축구'}
            </Typography>
          </Grid>
          <Grid xs={3}>
            <Typography variant='subtitle2' color='text.secondary'>
              성별
            </Typography>
          </Grid>
          <Grid xs={9}>
            <Typography variant='body2' color='text.secondary'>
              {player?.name || '남'}
            </Typography>
          </Grid>
          <Grid xs={3}>
            <Typography variant='subtitle2' color='text.secondary'>
              생일:
            </Typography>
          </Grid>
          <Grid xs={9}>
            <Typography variant='body2'>{player?.birth || '1992.02.11'}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size='small' variant='contained' color='primary'>
          수정
        </Button>
      </CardActions>
    </Card>
  );
}
