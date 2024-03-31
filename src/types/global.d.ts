interface RouteData {
  url: string;
  name: string;
  icon?: React.ReactElement;
}

type Anchor = 'top' | 'left' | 'bottom' | 'right';
type Gender = 'M' | 'F' | 'A';

interface Player {
  id?: number;
  name: string;
  gender: string;
  birth: string;
  picture: string;
}

interface Competition {
  [x: string]: any;
  id?: number | string;
  name: string;
  address: string;
  poster: string;
  start_date: string;
  end_date: string;
  description: string;
  organizer: string;
}

interface Tournaments {
  [groupKey: string]: Tournament;
}

type Tournament = TournamentNode[];

interface TournamentNode {
  groupKey: string;
  size: number; // 2, 4, 8, 16, 32, 64
  round: number; // 2, 4, 8, 16, 32, 64
  gameOrder: number; // 0~1, 0~3
}

class Coordinate {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(coordinate: Coordinate) {
    this.x += coordinate.x;
    this.y += coordinate.y;
    return this;
  }
  sub(coordinate: Coordinate) {
    this.x -= coordinate.x;
    this.y -= coordinate.y;
    return this;
  }
}

interface Team {
  id: number;
  name: string;
  location: string;
  emblem: string;
  gender: string;
  isActive: boolean;
}

interface SelectProperty {
  value: string | number | undefined;
  name: string;
}
