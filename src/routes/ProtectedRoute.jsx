import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { showError } from 'views/Utils/toast';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      const portalType = localStorage.getItem('portalType');
      if (portalType === 'seller') {
        navigate('/seller-login');
      } else {
        navigate('/login');
      }
    } else if (allowedRoles && !allowedRoles.includes(auth.userData?.userType)) {
      showError('Access Denied: You do not have permission to view this page.');
      navigate('/dashboard/default');
    }
  }, [auth.isAuthenticated, auth.userData?.userType, allowedRoles, navigate]);

  if (!auth.isAuthenticated) {
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(auth.userData?.userType)) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
