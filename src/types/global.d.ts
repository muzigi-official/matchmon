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
