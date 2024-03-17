// https://github.com/g-loot/react-tournament-brackets 디자인 참고

import { Box, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

// https://codesandbox.io/p/sandbox/tournament-bracket-po5u4?file=%2F

const emblemExample =
  'https://marketplace.canva.com/EADwijeCsr8/2/0/1600w/canva-%EC%B2%AD%EB%A1%9D%EC%83%89-%EA%B3%B5-%EC%95%84%EC%9D%B4%EC%BD%98%EC%9D%B4-%EC%9E%88%EB%8A%94-%EC%B6%95%EA%B5%AC-%EB%A1%9C%EA%B3%A0-2VqJzy6ID_o.jpg';

export interface NodeInfo {
  round: number;
  gameOrder: number;
  date?: string;
  emblemA?: string;
  emblemB?: string;
  teamNameA?: string;
  teamNameB?: string;
  scoreA?: string | number;
  scoreB?: string | number;
}

interface NodeProps extends NodeInfo {
  x: number;
  y: number;
  width: number;
  height: number;
}

const fontSize = 11;

export default function NodeV2(props: NodeProps) {
  const {
    x,
    y,
    width,
    height,
    round,
    gameOrder,
    date = '',
    emblemA,
    emblemB,
    teamNameA = '',
    teamNameB = '',
    scoreA = '',
    scoreB = '',
  } = props;

  return (
    <Paper
      sx={{
        p: 2,
        maxWidth: `${width}px`,
        maxHeight: `${height}px`,
        backgroundColor: 'white',
        position: 'absolute',
        top: y,
        left: x,
      }}
    >
      <Grid container>
        <Grid xs={6} maxHeight={20}>
          <Box display={'flex'} alignItems={'center'}>
            <Typography fontSize={fontSize} textAlign={'center'} paddingLeft={1}>
              {round}강 - {gameOrder}경기
            </Typography>
          </Box>
        </Grid>
        <Grid xs={6} maxHeight={20}>
          <Box>
            <Typography fontSize={fontSize} textAlign={'end'} paddingRight={1}>
              {date}
            </Typography>
          </Box>
        </Grid>
        <Grid xs={4} justifyContent={'center'} display={'flex'}>
          <TeamBlock teamName={teamNameA} score={scoreA} isWin={scoreA > scoreB} emblem={emblemA} />
        </Grid>
        <Grid xs={4} justifyContent={'center'}>
          <Typography fontSize={fontSize * 4} sx={{ fontWeight: 'bold' }} textAlign={'center'}>
            {scoreA} : {scoreB}
          </Typography>
        </Grid>
        <Grid xs={4} justifyContent={'center'} display={'flex'}>
          <TeamBlock teamName={teamNameB} score={scoreB} isWin={scoreA < scoreB} emblem={emblemB} />
        </Grid>
      </Grid>
    </Paper>
  );
}

interface PropsBlock {
  teamName: string;
  score: string | number;
  emblem?: string;
  isWin: boolean;
}
function TeamBlock({ teamName, emblem = emblemExample, isWin = false }: PropsBlock) {
  return (
    <Box flexDirection={'column'} display={'flex'} justifyContent={'center'}>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <img src={emblem} loading='lazy' width={50} height={50} />
      </Box>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <Typography fontSize={fontSize}>{teamName}</Typography>
      </Box>
    </Box>
  );
}
