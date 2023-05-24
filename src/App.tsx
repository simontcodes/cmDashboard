import { useEffect, useState, ComponentType, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/Authentication/SignIn';
import routes from './data/routes';
import { AuthProvider, AuthContext } from './context/AuthContext';

interface Route {
  path: string;
  component: ComponentType<any>;
  roles: string[];
}

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error(
      'AuthContext is undefined. Make sure AuthProvider is properly set up.'
    );
  }

  const { role, isLoggedIn } = authContext;

  const preloader = document.getElementById('preloader');

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
    }
  }, [isLoggedIn]);

  function filterRoutesByRole(routes: Route[]): Route[] {
    return routes.filter((route) => {
      const { roles } = route;
      return roles.includes('admin') || roles.includes('any');
    });
  }
  const filteredRoutes = filterRoutesByRole(routes);
  console.log(filteredRoutes);

  return loading ? (
    <p className=" text-center text-danger">Failed to load app</p>
  ) : (
    <>
      <AuthProvider>
        <Routes>
          {/* Protected Routes */}

          {filteredRoutes.map((route, index) => (
            <Route
              path={route.path}
              key={index}
              element={<route.component />}
            />
          ))}
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
