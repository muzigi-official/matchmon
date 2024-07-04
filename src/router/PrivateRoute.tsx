import { ComponentType } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import useUserStore from '../store/useUserStore';

interface PrivateRouteProps {
  component: ComponentType;
  roles: string[];
  userRole: string;
  path?: string;
  exact?: boolean;
}

const PrivateRoute = ({ component: Component, roles, userRole }: PrivateRouteProps) => {
  const location = useLocation();
  const isSignIn = useUserStore(state => state.isSignIn);

  if (!isSignIn) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (!roles.includes(userRole)) {
    return <Navigate to='/unauthorized' replace />;
  }

  return <Component />;
};

export default PrivateRoute;
