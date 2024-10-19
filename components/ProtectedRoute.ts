import { useEffect, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { NavigationProps } from '@/types/navigation.type';

type ProtectedRouteProps = {
    children: ReactNode;
    } & NavigationProps;

const ProtectedRoute = ({ children, navigation }: ProtectedRouteProps) => {
  const isAuthenticated = useSelector((state: { auth: { isAuthenticated: boolean } }) => state.auth.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.push('login');
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
