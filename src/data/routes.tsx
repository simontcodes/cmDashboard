// import SignIn from '../pages/Authentication/SignIn';
// import SignUp from './pages/Authentication/SignUp';
import Calendar from '../pages/Calendar';
import ECommerce from '../pages/Dashboard/ECommerce';
import ClientsPage from '../pages/ClientsPage';
import ClientPage from '../pages/ClientPage';
import AppointmentsPage from '../pages/AppointmentsPage';
import PaymentsPage from '../pages/PaymentsPage';
import ProfilePage from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';

const routes = [
  {
    path: '/',
    component: ECommerce,
    roles: ['admin'],
  },
  {
    path: '/calendar',
    component: Calendar,
    roles: ['admin'],
  },
  {
    path: '/clients',
    component: ClientsPage,
    roles: ['admin'],
  },
  {
    path: '/profile',
    component: ProfilePage,
    roles: ['client'],
  },
  {
    path: '/appointments',
    component: AppointmentsPage,
    roles: ['admin'],
  },
  {
    path: '/payments',
    component: PaymentsPage,
    roles: ['admin'],
  },
  {
    path: '/client/:userId',
    component: ClientPage,
    roles: ['admin', 'client'],
  },
  // {
  //   path: '/signin',
  //   component: SignIn,
  //   roles: ['any'],
  // },
  {
    path: '*',
    component: NotFoundPage,
    roles: ['any'],
  },
];

export default routes;
