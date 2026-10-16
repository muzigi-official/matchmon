import { ElementType } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link, { LinkProps } from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const breadcrumbNameMap: { [key: string]: string } = {
  '/inbox': 'Inbox',
  '/inbox/important': 'Important',
  '/trash': 'Trash',
  '/spam': 'Spam',
  '/drafts': 'Drafts',
};

interface ILinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

function LinkRouter(props: ILinkRouterProps) {
  return <Link {...props} component={RouterLink as ElementType} />;
}

export default function LayoutBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <Breadcrumbs aria-label='breadcrumb'>
      <LinkRouter underline='hover' color='inherit' to='/'>
        Home
      </LinkRouter>
      {pathnames.map((_value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography color='text.primary' key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <LinkRouter underline='hover' color='inherit' to={to} key={to}>
            {breadcrumbNameMap[to]}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
}
