import IconProfile from '../images/icon/icon-profile.svg';
import IconForm from '../images/icon/icon-form.svg';
import IconUpload from '../images/icon/icon-upload.svg';
import IconDashboard from '../images/icon/icon-dashboard.svg';

const clientMenuData = [
  {
    to: '/',
    includes: 'dashboard',
    icon: IconDashboard,
    name: 'Dashboard',
    alt: 'dashboard icon',
    submenu: [{ to: '/', name: 'Ecommerce', includes: 'ecommerce' }],
  },
  {
    to: '/profile',
    includes: 'profile',
    icon: IconProfile,
    name: 'Profile',
    alt: 'profile icon',
    submenu: [],
  },
  {
    to: '/form',
    includes: 'form',
    icon: IconForm,
    name: 'Form',
    alt: 'form icon',
    submenu: [],
  },
  {
    to: '/upload',
    includes: 'upload',
    icon: IconUpload,
    name: 'Upload',
    alt: 'upload icon',
    submenu: [],
  },
];

export default clientMenuData;
