import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import List from '@mui/material/List';
import { ListItemProps } from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ShieldIcon from '@mui/icons-material/Shield';
import PersonOutline from '@mui/icons-material/PersonOutline';
import StadiumIcon from '@mui/icons-material/Stadium';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface RouteData {
  url: string;
  name: string;
  icon?: React.ReactElement;
}

export const routeDataList: RouteData[] = [
  { url: '/team', name: '팀', icon: <ShieldIcon /> },
  { url: '/competition', name: '대회', icon: <StadiumIcon /> },
  { url: '/player', name: '선수', icon: <PersonOutline /> },
  { url: '/ranking', name: '랭킹', icon: <EmojiEventsIcon /> },
  { url: '/bracket', name: '대진표', icon: <CalendarMonthIcon /> },
];

interface ListItemLinkProps extends ListItemProps {
  to: string;
  open?: boolean;
  primary: string;
  icon?: React.ReactElement;
}

const breadcrumbNameMap: { [key: string]: string } = {};

function ListItemLink(props: ListItemLinkProps) {
  const { to, open, icon, primary, ...other } = props;

  return (
    <li>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
        component={RouterLink}
        to={to}
        {...other}
      >
        {icon ? (
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            {icon}
          </ListItemIcon>
        ) : null}
        <ListItemText color='primary' primary={primary} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </li>
  );
}

interface Props {
  open: boolean;
  onClick: () => void;
}

export default function LinkList(props: Props) {
  const { open, onClick } = props;
  return (
    <List>
      {routeDataList.map(routeData => {
        const { url, name, icon } = routeData;
        breadcrumbNameMap[url] = name;
        const primary = breadcrumbNameMap[url];
        return <ListItemLink key={url} to={url} open={open} icon={icon} primary={primary} onClick={onClick} />;
      })}
    </List>
  );
}
