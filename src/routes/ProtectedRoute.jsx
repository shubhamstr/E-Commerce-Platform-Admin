import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return auth.isAuthenticated ? children : null;
};

export default ProtectedRoute;
