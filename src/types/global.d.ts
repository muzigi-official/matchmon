declare interface YoutubeFormat {
  url: string;
  title: string;
  description: string;
  thumbnailUrl: string;
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

declare interface DialogData {
  [key: string]: string;
  name: string;
  emblem: string;
  location: string;
  gender: Gender;
  teamType: string;
  managerName: string;
  phone: string;
  email: string;
  uniformTop: string;
  uniformBottom: string;
  uniformSocks: string;
}

interface Competition {
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
