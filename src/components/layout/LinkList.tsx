import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import List from '@mui/material/List';
import { ListItemProps } from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

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
  list: IRouteData[];
  onClick: () => void;
}

export default function LinkList({ open, onClick, list }: Props) {
  return (
    <List>
      {list.map(routeData => {
        const { url, name, icon } = routeData;
        breadcrumbNameMap[url] = name;
        const primary = breadcrumbNameMap[url];
        return <ListItemLink key={url} to={url} open={open} icon={icon} primary={primary} onClick={onClick} />;
      })}
    </List>
  );
}
