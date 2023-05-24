import { useEffect, useState, ComponentType } from 'react';
import { Route, Routes } from 'react-router-dom';

import routes from './data/routes';

interface Route {
  path: string;
  component: ComponentType<any>;
  roles: string[];
}

function App() {
  const [loading, setLoading] = useState<boolean>(true);

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
      <Routes>
        {filteredRoutes.map((route, index) => (
          <Route path={route.path} key={index} element={<route.component />} />
        ))}
      </Routes>
    </>
  );
}

export default App;
