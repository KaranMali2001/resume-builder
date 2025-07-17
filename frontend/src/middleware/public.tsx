import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  console.log('token', token);
  useEffect(() => {
    if (token != null) {
      navigate('/dashboard');
    }
  }, [token]);

  return children;
};
