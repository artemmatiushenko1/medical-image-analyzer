import { AppRoute } from '@/libs/enums';
import { useAuthStore } from '@/stores/auth.store';
import { Navigate, useLocation } from 'react-router-dom';

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute = (props: PrivateRouteProps) => {
  const { children } = props;

  const user = useAuthStore((state) => state.user);

  const isAuthenticated = Boolean(user);

  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={AppRoute.SIGN_IN} state={{ from: location }} replace />
  );
};

export { PrivateRoute };
