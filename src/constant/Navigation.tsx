import ShieldIcon from '@mui/icons-material/Shield';
import PersonOutline from '@mui/icons-material/PersonOutline';
import StadiumIcon from '@mui/icons-material/Stadium';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const adminNavItems = [
  { name: '대회', path: '/admin/competitions', icon: <StadiumIcon /> },
  { name: '유저 목록', path: '/admin/users', icon: <AccountCircleIcon /> },
  { name: '플레이어 목록', path: '/admin/players', icon: <PersonOutline /> },
  { name: '팀', path: '/admin/teams', icon: <ShieldIcon /> },
];

export const competitionUserNavItems = [
  { name: '내 대회', path: '/competition/my-competitions', icon: <StadiumIcon /> },
  { name: '참가한 팀', path: '/competition/teams', icon: <ShieldIcon /> },
  { name: '팀 선수 목록', path: '/competition/team-players', icon: <PersonOutline /> },
  { name: '조편성', path: '/competition/groups' },
  { name: '시간표', path: '/competition/schedule', icon: <CalendarMonthIcon /> },
  { name: '경기 결과', path: '/competition/results', icon: <ScoreboardIcon /> },
  { name: '랭킹', path: '/competition/ranking', icon: <EmojiEventsIcon /> },
];

export const userNavItems = [
  { name: '참가한 대회', path: '/user/my-competitions', icon: <StadiumIcon /> },
  { name: '팀 페이지', path: '/user/team-page', icon: <ShieldIcon /> },
];
