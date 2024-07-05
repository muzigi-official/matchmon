import { Navigate } from 'react-router-dom';
import useUserStore from '../store/useUserStore';

const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  const isSignIn = useUserStore(state => state.isSignIn);
  return isSignIn ? <>{children}</> : <Navigate to='/login' replace />;
};

export default ProtectedLayout;
