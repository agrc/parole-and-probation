import { lazy, Suspense, useContext } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthContext } from './UserContext';

function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext);

  return <Router>{isAuthenticated() ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}</Router>;
}

function AuthenticatedRoutes() {
  const App = lazy(async () => await import('./App'));
  const NotFound = lazy(async () => ({ default: (await import('./pages')).NotFound }));

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<div />}>
            <App />
          </Suspense>
        }
      />
      <Route
        element={
          <Suspense fallback={<div />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}

function UnauthenticatedRoutes() {
  const LandingPage = lazy(async () => ({ default: (await import('./pages')).LandingPage }));

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<div />}>
            <LandingPage />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
