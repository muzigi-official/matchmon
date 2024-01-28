interface RouteData {
  url: string;
  name: string;
}

export const routeDataList: RouteData[] = [
  { url: '/main', name: '메인' },
  { url: '/team', name: '팀' },
  { url: '/competition', name: '대회' },
  { url: '/player', name: '선수' },
  { url: '/ranking', name: '랭킹' },
  { url: '/bracket', name: '대진표' },
];
