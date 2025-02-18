import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { selectCurrentToken } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';


type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const PrivetRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(selectCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }
  if (role !== undefined && role !== user?.role) {
    return <Navigate to="/login" replace={true} />;
  }

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default PrivetRoute;