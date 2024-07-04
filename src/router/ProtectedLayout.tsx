import { Navigate } from 'react-router-dom';
import useUserStore from '../store/useUserStore';

const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  const token = useUserStore(state => state.token);
  return token ? children : <Navigate to='/login' replace />;
};

export default ProtectedLayout;
