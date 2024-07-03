import { ComponentType } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  component: ComponentType;
  roles: string[];
  userRole: string;
}

const PrivateRoute = ({ component: Component, roles, userRole }: PrivateRouteProps) => {
  const location = useLocation();

  if (!roles.includes(userRole)) {
    return <Navigate to='/unauthorized' state={{ from: location }} replace />;
  }

  return <Component />;
};

export default PrivateRoute;
