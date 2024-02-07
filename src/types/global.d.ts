declare interface YoutubeFormat {
  url: string;
  title: string;
  description: string;
  thumbnailUrl: string;
}

type Anchor = 'top' | 'left' | 'bottom' | 'right';
type Gender = 'M' | 'F' | 'A';

declare interface PlayerData {
  [key: string]: string;
  이름: string;
  선출여부: string;
  성별: string;
  연령대: string;
  프사: string;
  대표팀: string;
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
