// import SignIn from '../pages/Authentication/SignIn';
// import SignUp from './pages/Authentication/SignUp';
import CalendarPage from '../pages/CalendarPage';
import ECommerce from '../pages/Dashboard/ECommerce';
import ClientsPage from '../pages/ClientsPage';
import ClientPage from '../pages/ClientPage';
import AppointmentsPage from '../pages/AppointmentsPage';
import PaymentsPage from '../pages/PaymentsPage';
import ProfilePage from '../pages/ProfilePage';
import FormPage from '../pages/FormPage';
import UploadPage from '../pages/UploadPage';
import NotFoundPage from '../pages/NotFoundPage';

const routes = [
  {
    path: '/',
    component: ECommerce,
    roles: ['admin', 'client'],
  },
  {
    path: '/calendar',
    component: CalendarPage,
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
  {
    path: '/form',
    component: FormPage,
    roles: ['client'],
  },
  {
    path: '/upload',
    component: UploadPage,
    roles: ['client'],
  },
  {
    path: '*',
    component: NotFoundPage,
    roles: ['any'],
  },
];

export default routes;
