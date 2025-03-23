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
    navCap: 'Quản lý Sản phẩm',
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
    displayName: 'Sản Phẩm',
    iconName: 'package',
    route: '/products',
    children: [
      {
        displayName: 'Danh sách',
        iconName: 'list',
        route: '/products/List-products',
      },
      {
        displayName: 'Thêm mới',
        iconName: 'plus',
        route: '/products/Add-products',
      },
    ],
  },
  {
    navCap: 'Quản lý Thanh toán',
  },
  {
    "displayName": "Thanh toán",
    "iconName": "credit-card",
    "route": "/payment"
  },
  {
    navCap: 'Quản lý Đơn hàng',
  },
  {
    "displayName": "Đơn hàng",
    "iconName": "shopping-cart",
    "route": "/orders"
  },
  {
    navCap: 'Quản lý Tài Khoản',
  },
  {
    "displayName": "Danh sách",
    "iconName": "list",
    "route": "/account",
    children: [
      {
        displayName: 'Danh sách Người Dùng',
        iconName: 'users',
        route: '/account/list-users',
      },
      {
        displayName: 'Danh sách Quản trị viên',
        iconName: 'user-shield',
        route: '/account/list-admin',
      },
    ],
  },
  {
    displayName: 'Thêm mới',
    iconName: 'plus',
    route: '/account/add',
  },
  {
    navCap: 'Đăng Nhập | Đăng Ký',
  },
  {
    displayName: 'Login',
    iconName: 'login',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
  },
];
