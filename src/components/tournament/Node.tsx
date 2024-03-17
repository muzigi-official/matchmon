// https://github.com/g-loot/react-tournament-brackets 디자인 참고

import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

// https://codesandbox.io/p/sandbox/tournament-bracket-po5u4?file=%2F

export interface NodeInfo {
  round: number;
  gameOrder: number;
  date?: string;
  teamNameA?: string;
  teamNameB?: string;
  scoreA?: string | number;
  scoreB?: string | number;
}

interface NodeProps extends NodeInfo {
  x: number;
  y: number;
}

const fontSize = 5;
const width = 50;
const height = 10;

export default function Node(props: NodeProps) {
  const { x, y, round, gameOrder, date = '', teamNameA = '', teamNameB = '', scoreA = '', scoreB = '' } = props;

  return (
    <Grid container position={'absolute'} top={y} left={x}>
      <Grid xs={12}>
        <Box width={width}>
          <Typography fontSize={fontSize}>{date}</Typography>
        </Box>
      </Grid>
      <Grid xs={12}>
        <TeamScoreBlock teamName={teamNameA} score={scoreA} isWin={scoreA > scoreB} />
      </Grid>
      <Grid xs={12}>
        <TeamScoreBlock teamName={teamNameB} score={scoreB} isWin={scoreA < scoreB} />
      </Grid>
      <Grid xs={12}>
        <Box width={width} display={'flex'} alignItems={'center'}>
          <Typography fontSize={fontSize} textAlign={'center'}>
            {round}강 - {gameOrder}경기
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

interface PropsBlock {
  teamName: string;
  score: string | number;
  isWin: boolean;
}
function TeamScoreBlock({ teamName, score, isWin = false }: PropsBlock) {
  const backgroundColor = isWin ? '#E6D3FF' : '#C6B3CF';
  const backgroundColorScore = '#E6D3FF';
  const fontColor = isWin ? 'white' : 'grey';

  return (
    <Box width={width} height={height} flexDirection={'row'} display={'flex'}>
      <Box width={(width * 4) / 5} display={'flex'} alignItems={'center'} sx={{ backgroundColor: backgroundColor }}>
        <Typography fontSize={fontSize} color={fontColor}>
          {teamName}
        </Typography>
      </Box>
      <Box
        width={width / 5}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{ backgroundColor: backgroundColorScore }}
      >
        <Typography fontSize={fontSize} color={fontColor}>
          {score || ''}
        </Typography>
      </Box>
    </Box>
  );
}
