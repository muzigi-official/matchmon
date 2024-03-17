import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

interface Props {
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export default function Line(props: Props) {
  const { x, y, width = 2, height = 2 } = props;
  return (
    <Grid container position={'absolute'} top={y} left={x}>
      <Box sx={{ backgroundColor: 'black', zIndex: -1 }} width={width} height={height}></Box>
    </Grid>
  );
}
