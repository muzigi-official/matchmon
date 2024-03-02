import { Box } from '@mui/material';
import Node, { NodeInfo } from './Node';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

class Coordinate {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(coordinate: Coordinate) {
    const x = this.x + coordinate.x;
    const y = this.y + coordinate.y;

    return new Coordinate(x, y);
  }
  sub(coordinate: Coordinate) {
    const x = this.x - coordinate.x;
    const y = this.y - coordinate.y;
    return new Coordinate(x, y);
  }
  multiply(times: number) {
    const x = this.x * times;
    const y = this.y * times;

    return new Coordinate(x, y);
  }
}

interface Props {
  round: number;
  nodeInfoList: NodeInfo[];
}
export function makeNodeProps(
  round: number,
  gameOrder: number,
  date: string,
  teamNameA: string,
  teamNameB: string,
  scoreA: string | number,
  scoreB: string | number,
) {
  return { round, gameOrder, date, teamNameA, teamNameB, scoreA, scoreB };
}
const logRound = (round: number): number => {
  if (round == 128) return 7;
  if (round == 64) return 6;
  if (round == 32) return 5;
  if (round == 16) return 4;
  if (round == 8) return 3;
  if (round == 4) return 2;
  if (round == 2) return 1;
  return 0;
};

const baseWidth = new Coordinate(100, 0);
const baseHeight = new Coordinate(0, 50);

const intervalWidth = new Coordinate(75, 0);
const intervalHeight = new Coordinate(0, 40);

const makeRelativePosition = (round: number): any => {
  const centerX = logRound(round);

  const relativePosition: any = { 2: {} };

  relativePosition[round] = {};
  for (let i = 1; i <= round / 2; i++) {
    const halfRound = round / 2;
    const quarterRound = halfRound / 2;
    if (i <= quarterRound) {
      relativePosition[round][i] = [1, i];
    } else {
      relativePosition[round][i] = [centerX + logRound(round) - 1, i - quarterRound];
    }
  }

  for (let roundNow: number = round / 2; roundNow >= 4; roundNow = roundNow / 2) {
    relativePosition[roundNow] = {};
    for (let i = 1; i <= roundNow / 2; i++) {
      const doulbeRound = roundNow * 2;
      const halfRound = roundNow / 2;
      const quarterRound = halfRound / 2;
      const a = relativePosition[doulbeRound][i * 2 - 1][1];
      const b = relativePosition[doulbeRound][i * 2][1];
      if (i <= quarterRound) {
        relativePosition[roundNow][i] = [centerX - logRound(roundNow) + 1, (a + b) / 2];
      } else {
        relativePosition[roundNow][i] = [centerX + logRound(roundNow) - 1, (a + b) / 2];
      }
    }
  }
  console.log(relativePosition, round);
  relativePosition[2][1] = [centerX, relativePosition[4][1][1] - 1];

  return relativePosition;
};
const sampleNodePropsList: NodeInfo[] = [
  makeNodeProps(2, 1, '2024.02.24 10:00', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(4, 1, '2024.02.22 10:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(4, 2, '2024.02.22 12:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(8, 1, '2024.02.20 10:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(8, 2, '2024.02.20 10:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(8, 3, '2024.02.20 12:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(8, 4, '2024.02.20 12:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(16, 1, '2024.02.20 10:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(16, 2, '2024.02.20 10:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(16, 3, '2024.02.20 12:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(16, 4, '2024.02.20 12:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(16, 5, '2024.02.20 10:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(16, 6, '2024.02.20 10:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(16, 7, '2024.02.20 12:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(16, 8, '2024.02.20 12:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
];
export default function TournamentLayout(props: Props) {
  const { round = 32, nodeInfoList = sampleNodePropsList } = props;

  const RelativePosition = makeRelativePosition(round);

  const makeXY = (round: number, gameOrder: number): Coordinate => {
    console.log(round, gameOrder);
    const position = RelativePosition[round][gameOrder];
    const x = position[0];
    const y = position[1];

    return intervalWidth.multiply(x).add(intervalHeight.multiply(y));
  };

  const BoxWidth = baseWidth.add(intervalWidth.multiply((logRound(round) - 1) * 2 + 1)).x;
  const BoxHeight = baseHeight.add(intervalHeight.multiply(round / 4)).y;

  return (
    <TransformWrapper initialScale={2} initialPositionX={0} initialPositionY={0}>
      <TransformComponent>
        <Box width={BoxWidth} height={BoxHeight} border={1}>
          {nodeInfoList.map((nodeProps, index) => {
            const { round, gameOrder, date, teamNameA, teamNameB, scoreA, scoreB } = nodeProps;
            const { x, y } = makeXY(round, gameOrder);
            return (
              <Node
                x={x}
                y={y}
                round={round}
                gameOrder={gameOrder}
                date={date}
                teamNameA={teamNameA}
                teamNameB={teamNameB}
                scoreA={scoreA}
                scoreB={scoreB}
                key={index}
              />
            );
          })}
        </Box>
      </TransformComponent>
    </TransformWrapper>
  );
}
