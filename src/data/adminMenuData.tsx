import IconCalendar from '../images/icon/icon-calendar-side.svg';
import IconClients from '../images/icon/icon-clients.svg';
import IconPayment from '../images/icon/icon-payment.svg';
import IconAppointment from '../images/icon/icon-appointment.svg';
import IconSettings from '../images/icon/icon-settings.svg';
import IconProfile from '../images/icon/icon-profile.svg';
import IconDashboard from '../images/icon/icon-dashboard.svg';

const adminMenuData = [
  {
    to: '/',
    includes: 'dashboard',
    icon: IconDashboard,
    name: 'Dashboard',
    alt: 'dashboard icon',
    submenu: [{ to: '/', name: 'Ecommerce', includes: 'ecommerce' }],
  },
  {
    to: '/calendar',
    includes: 'calendar',
    icon: IconCalendar,
    name: 'Calendar',
    alt: 'calendar icon',
    submenu: [],
  },
  {
    to: '/clients',
    includes: 'clients',
    icon: IconClients,
    name: 'Clients',
    alt: 'clients icon',
    submenu: [],
  },
  {
    to: '/appointments',
    includes: 'appointments',
    icon: IconAppointment,
    name: 'Appointments',
    alt: 'appointments icon',
    submenu: [],
  },
  {
    to: '/payments',
    includes: 'payments',
    icon: IconPayment,
    name: 'Payments',
    alt: 'payments icon',
    submenu: [],
  },
  {
    to: '/profile',
    includes: 'profile',
    icon: IconProfile,
    name: 'Profile',
    alt: 'Profile icon',
    submenu: [],
  },
  {
    to: '/settings',
    includes: 'settings',
    icon: IconSettings,
    name: 'Settings',
    alt: 'settings icon',
    submenu: [],
  },
];

export default adminMenuData;
