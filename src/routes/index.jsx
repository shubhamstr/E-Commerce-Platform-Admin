import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

import { useSelector } from 'react-redux';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const auth = useSelector((state) => state.auth);
  const routesList = auth.isAuthenticated ? MainRoutes : AuthenticationRoutes;
  return useRoutes([routesList]);
}
