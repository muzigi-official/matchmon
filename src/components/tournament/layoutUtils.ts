/* eslint-disable no-magic-numbers -- 토너먼트 대진표 좌표 계산 전용 숫자는 로컬 유지 */
// 토너먼트 레이아웃 공유 유틸 (좌표 클래스/기준 좌표/노드 props 생성)
// NOTE: 컴포넌트 파일(Layout.tsx)과 분리해 Fast Refresh(react-refresh) 경고를 피한다.

export class Coordinate {
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

export const baseWidth = new Coordinate(300, 0);
export const baseHeight = new Coordinate(0, 100);

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
