import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-grid-add',
    route: '/dashboard',
  },
  {
    navCap: 'Quản lý',
  },
  {
    displayName: 'Thương Hiệu',
    iconName: 'badge',
    route: '/brands',
    children: [
      {
        displayName: 'Danh sách',
        iconName: 'list',
        route: '/brands/List-brands',
      },
      {
        displayName: 'Thêm mới',
        iconName: 'plus',
        route: '/brands/Add-brands',
      },
    ],
  },
  {
    displayName: 'Danh Mục',
    iconName: 'category',
    route: '/categories',
    children: [
      {
        displayName: 'Danh sách',
        iconName: 'list',
        route: '/categories/List-Categories',
      },
      {
        displayName: 'Thêm mới',
        iconName: 'plus',
        route: '/categories/Add-Categories',
      },
    ],
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'login',
    route: '/authentication',
    children: [
      {
        displayName: 'Login',
        iconName: 'point',
        route: '/authentication/login',
      },
    ],
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication',
    children: [
      {
        displayName: 'Register',
        iconName: 'point',
        route: '/authentication/register',
      },
    ],
  },
];
