import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Thống Kê',
    iconName: 'layout-grid-add',
    route: '/admin',
  },
  {
    navCap: 'Quản lý Sản phẩm',
  },
  {
    displayName: 'Thương Hiệu',
    iconName: 'badge',
    route: '/admin/brands',
    children: [
      {
        displayName: 'Danh sách',
        iconName: 'list',
        route: '/admin/brands/List-brands',
      },
      {
        displayName: 'Thêm mới',
        iconName: 'plus',
        route: '/admin/brands/Add-brands',
      },
    ],
  },
  {
    displayName: 'Danh Mục',
    iconName: 'category',
    route: '/admin/categories',
    children: [
      {
        displayName: 'Danh sách',
        iconName: 'list',
        route: '/admin/categories/List-Categories',
      },
      {
        displayName: 'Thêm mới',
        iconName: 'plus',
        route: '/admin/categories/Add-Categories',
      },
    ],
  },
  {
    displayName: 'Sản Phẩm',
    iconName: 'package',
    route: '/admin/products',
    children: [
      {
        displayName: 'Danh sách',
        iconName: 'list',
        route: '/admin/products/List-products',
      },
      {
        displayName: 'Thêm mới',
        iconName: 'plus',
        route: '/admin/products/Add-products',
      },
    ],
  },
  {
    navCap: 'Quản lý Biến Thể',
  },
  {
    displayName: 'Size',
    iconName: 'ruler',
    route: '/admin/size_variation',
    children: [
      {
        displayName: 'Danh sách',
        iconName: 'list',
        route: '/admin/size_variation/list-size-variant',
      },
      {
        displayName: 'Thêm mới',
        iconName: 'plus',
        route: '/admin/size_variation/add-size-variant',
      },
    ],
  },
  {
    displayName: 'Màu sắc',
    iconName: 'palette',
    route: '/admin/color_variation',
    children: [
      {
        displayName: 'Danh sách',
        iconName: 'list',
        route: '/admin/color_variation/list-color-variant',
      },
      {
        displayName: 'Thêm mới',
        iconName: 'plus',
        route: '/admin/color_variation/add-color-variant',
      },
    ],
  },
  {
    navCap: 'Quản lý Thanh toán',
  },
  {
    "displayName": "Thanh toán",
    "iconName": "credit-card",
    "route": "/admin/payment"
  },
  {
    navCap: 'Quản lý Đơn hàng',
  },
  {
    "displayName": "Đơn hàng",
    "iconName": "shopping-cart",
    "route": "/admin/orders"
  },
  {
    navCap: 'Quản lý Tài Khoản',
  },
  {
    "displayName": "Danh sách",
    "iconName": "list",
    "route": "/admin/account",
    children: [
      {
        displayName: 'Danh sách Người Dùng',
        iconName: 'users',
        route: '/admin/account/list-users',
      },
      {
        displayName: 'Danh sách Quản trị viên',
        iconName: 'user-shield',
        route: '/admin/account/list-admin',
      },
    ],
  },
  {
    displayName: 'Thêm mới',
    iconName: 'plus',
    route: '/admin/account/add',
  },
  {
    navCap: 'Đăng Nhập | Đăng Ký',
  },
  {
    displayName: 'Login',
    iconName: 'login',
    route: '/admin/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/admin/authentication/register',
  },
];
