import * as React from 'react';
import List from '@mui/material/List';
import { ListItemProps } from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link as RouterLink } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { routeDataList } from 'src/assets/const/route';
// Ref: https://mui.com/material-ui/react-breadcrumbs/#integration-with-react-router

interface ListItemLinkProps extends ListItemProps {
  to: string;
  open?: boolean;
}

const breadcrumbNameMap: { [key: string]: string } = {};

routeDataList.forEach(routeData => {
  const { url, name } = routeData;
  breadcrumbNameMap[url] = name;
});

function ListItemLink(props: ListItemLinkProps) {
  const { to, open, ...other } = props;
  const primary = breadcrumbNameMap[to];

  let icon = null;
  if (open != null) {
    icon = open ? <ExpandLess /> : <ExpandMore />;
  }

  return (
    <li>
      <ListItemButton component={RouterLink} to={to} {...other}>
        <ListItemText primary={primary} />
        {icon}
      </ListItemButton>
    </li>
  );
}

interface Props {
  onClick: () => void;
}

export default function LinkList(props: Props) {
  const { onClick } = props;
  return (
    <List>
      <ListItemLink to='/main' onClick={onClick} />
      <ListItemLink to='/team' onClick={onClick} />
      <ListItemLink to='/competition' onClick={onClick} />
      <ListItemLink to='/player' onClick={onClick} />
      <Divider />
      <ListItemLink to='/ranking' onClick={onClick} />
      <ListItemLink to='/bracket' onClick={onClick} />
    </List>
  );
}
