import { Link as RouterLink } from 'react-router-dom';

import { List, ListItemProps, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

interface IListItemLinkProps extends ListItemProps {
  to: string;
  open?: boolean;
  primary: string;
  icon?: React.ReactElement;
}

function ListItemLink({ to, open, icon, primary, ...other }: IListItemLinkProps) {
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

interface ILinkListProps {
  open: boolean;
  list: INavItem[];
  onClick: () => void;
}

const breadcrumbNameMap: { [key: string]: string } = {};

const LinkList = ({ open, list, onClick }: ILinkListProps) => {
  return (
    <List>
      {list.map(routeData => {
        const { path, name, icon } = routeData;
        breadcrumbNameMap[path] = name;
        const primary = breadcrumbNameMap[path];
        return <ListItemLink key={path} to={path} open={open} icon={icon} primary={primary} onClick={onClick} />;
      })}
    </List>
  );
};

export default LinkList;
