import { ComponentType } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import useUserStore from '../store/useUserStore';

interface IPrivateRouteProps {
  component: ComponentType;
  roles: string[];
}

const PrivateRoute = ({ component: Component, roles, ...rest }: IPrivateRouteProps) => {
  const location = useLocation();
  const { user, isSignIn } = useUserStore();

  if (!isSignIn) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (user && roles.includes(user.role)) {
    return <Component {...rest} />;
  }

  return <Component />;
};

export default PrivateRoute;
