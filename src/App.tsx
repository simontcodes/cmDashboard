import { useEffect, useState, ComponentType, useContext } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignIn from './pages/Authentication/SignIn';
import routes from './data/routes';
import { AuthProvider, AuthContext } from './context/AuthContext';

interface Route {
  path: string;
  component: ComponentType<any>;
  roles: string[];
}

interface RoutesByRoleState extends Array<Route> {}

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [routesByRole, setRoutesByRole] = useState<RoutesByRoleState>([]);
  // const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  // Check if the context is defined and extract the values
  // const isLoggedIn = authContext?.isLoggedIn;
  // const role = authContext?.role;

  function filterRoutesByRole(routes: Route[], roleType: string): Route[] {
    console.log('inside filtering routes');
    // Filter the routes based on the specified role
    const filteredRoutes = routes.filter((route) => {
      return route.roles.includes(roleType) || route.roles.includes('any');
    });
    console.log(filteredRoutes);
    return filteredRoutes;
  }

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
    navigate('/');
  }, [routesByRole.length > 0]);

  useEffect(() => {
    const sessionRole = sessionStorage.getItem('role');
    if (!sessionStorage.getItem('token')) {
      navigate('/signin');
    } else {
      if (sessionRole !== null) {
        setRoutesByRole(filterRoutesByRole(routes, sessionRole));
      } else {
        // Handle the case when sessionRole is null (e.g., set default role or handle error)
      }
    }
  }, []);

  return loading ? (
    <p className=" text-center text-danger">Loading</p>
  ) : (
    <>
      <AuthProvider>
        <Routes>
          {/* Protected Routes */}

          {routesByRole.map((route, index) => (
            <Route
              path={route.path}
              key={index}
              element={<route.component />}
            />
          ))}

          {/* Protected Routes */}
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
