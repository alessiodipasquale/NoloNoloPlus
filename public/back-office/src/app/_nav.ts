import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/pages/dashboard',
    icon: 'icon-speedometer',
  },
  {
    name: 'Utenti',
    icon: 'cil-people',
    url: '/pages/users/main-users'
  },
  {
    name: 'Oggetti',
    icon: 'cil-apps',
    url: '/pages/items/main-items'
   },
];
