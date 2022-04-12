import ky from 'ky';
import { createContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const UserContext = createContext({
  user: null,
});

export default UserContext;

export const AuthContext = createContext();
const Provider = AuthContext.Provider;

export function AuthProvider({ children }) {
  const { status, error, data } = useQuery('auth', () =>
    ky.get('/api/configuration', { timeout: 5000, redirect: 'manual', throwHttpErrors: false }).json()
  );
  const [authInfo, setAuthInfo] = useState({
    id: null,
    userData: {},
  });

  const isAuthenticated = () => authInfo.id !== null;

  useEffect(() => {
    if (status !== 'success' || error) {
      return;
    }

    setAuthInfo(data);
  }, [status, error, data]);

  return <Provider value={{ error, authInfo, isAuthenticated, setAuthInfo }}>{children}</Provider>;
}
