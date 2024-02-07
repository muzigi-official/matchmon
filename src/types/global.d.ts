declare interface YoutubeFormat {
  url: string;
  title: string;
  description: string;
  thumbnailUrl: string;
}

type Anchor = 'top' | 'left' | 'bottom' | 'right';
type Gender = 'Male' | 'Female' | '혼성';

interface Player {
  id: number;
  name: string;
  gender: string;
  birth: string;
  picture: string;
}
