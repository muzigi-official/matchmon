/* eslint-disable no-magic-numbers -- 선 좌표 계산 전용 숫자는 로컬 유지 */
import { Coordinate } from './layoutUtils';
import Line from './Line';

interface ILineN2NProps {
  start: Coordinate;
  end: Coordinate;
}

export default function LineN2N(props: ILineN2NProps) {
  const { start, end } = props;

  const isLeft = start.x < end.x;
  const isTop = start.y < end.y;

  return (
    <>
      {isLeft && isTop && <LineN2NA start={start} end={end} />}
      {isLeft && !isTop && <LineN2NB start={start} end={end} />}
      {!isLeft && isTop && <LineN2NC start={start} end={end} />}
      {!isLeft && !isTop && <LineN2ND start={start} end={end} />}
    </>
  );
}

function LineN2NA(props: ILineN2NProps) {
  const { start, end } = props;

  return (
    <>
      <Line x={start.x} y={start.y} width={(end.x - start.x) / 2} />
      <Line x={(end.x + start.x) / 2} y={start.y} height={end.y - start.y} />
      <Line x={(end.x + start.x) / 2} y={end.y} width={(end.x - start.x) / 2} />
    </>
  );
}
function LineN2NB(props: ILineN2NProps) {
  const { start, end } = props;
  return (
    <>
      <Line x={start.x} y={start.y} width={(end.x - start.x) / 2} />
      <Line x={(end.x + start.x) / 2} y={end.y} height={start.y - end.y} />
      <Line x={(end.x + start.x) / 2} y={end.y} width={(end.x - start.x) / 2} />
    </>
  );
}
function LineN2NC(props: ILineN2NProps) {
  const { start, end } = props;

  return (
    <>
      <Line x={(end.x + start.x) / 2} y={start.y} width={(start.x - end.x) / 2} />
      <Line x={(end.x + start.x) / 2} y={start.y} height={end.y - start.y} />
      <Line x={end.x} y={end.y} width={(start.x - end.x) / 2} />
    </>
  );
}
function LineN2ND(props: ILineN2NProps) {
  const { start, end } = props;

  return (
    <>
      <Line x={(end.x + start.x) / 2} y={start.y} width={(start.x - end.x) / 2} />
      <Line x={(end.x + start.x) / 2} y={end.y} height={start.y - end.y} />
      <Line x={end.x} y={end.y} width={(start.x - end.x) / 2} />
    </>
  );
}
