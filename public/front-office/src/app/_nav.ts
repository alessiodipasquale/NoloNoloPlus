import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/pages/dashboard',
    icon: 'icon-speedometer'
  },
  {
    name: 'Prenotazioni',
    url: 'pages/rentals/rentals-list',
    icon: 'cil-cart',
  }
];

export const whitelistedElements = ['Prenotazioni']
