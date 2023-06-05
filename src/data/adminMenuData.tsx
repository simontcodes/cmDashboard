import IconCalendar from '../images/icon/icon-calendar-side.svg';
import IconClients from '../images/icon/icon-clients.svg';
import IconPayment from '../images/icon/icon-payment.svg';
import IconAppointment from '../images/icon/icon-appointment.svg';
import IconSettings from '../images/icon/icon-settings.svg';
import IconProfile from '../images/icon/icon-profile.svg';

const adminMenuData = [
  {
    to: '/calendar',
    includes: 'calendar',
    icon: IconCalendar,
    name: 'Calendar',
    alt: 'calendar icon',
  },
  {
    to: '/clients',
    includes: 'clients',
    icon: IconClients,
    name: 'Clients',
    alt: 'clients icon',
  },
  {
    to: '/appointments',
    includes: 'appointments',
    icon: IconAppointment,
    name: 'Appointments',
    alt: 'appointments icon',
  },
  {
    to: '/payments',
    includes: 'payments',
    icon: IconPayment,
    name: 'Payments',
    alt: 'payments icon',
  },
  {
    to: '/profile',
    includes: 'profile',
    icon: IconProfile,
    name: 'Profile',
    alt: 'Profile icon',
  },
  {
    to: '/settings',
    includes: 'settings',
    icon: IconSettings,
    name: 'Settings',
    alt: 'settings icon',
  },
];

export default adminMenuData;
