import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { ClientComponent } from './layouts/client/client.component';
import { AuthAdminGuard } from './auth-admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/Client/home/home.routes').then((m) => m.HomeRoutes),
      },
      {
<<<<<<< HEAD
        path: 'cart',
        loadChildren: () =>
          import('./pages/Client/cart/cart.routes').then((m) => m.CartRoutes),
      },
      {
        path: 'shop',
        loadChildren: () =>
          import('./pages/Client/shop/shop.routes').then((m) => m.ShopRoutes),
      },
      {
        path: 'shop/:id',
        loadChildren: () =>
          import('./pages/Client/shop/product-detail/product-detail.routes').then((m) => m.ProductDetailRoutes),
        },

=======
        path: 'shop',
        loadChildren: () =>
          import('./pages/Client/shop/shop.routes').then((m) => m.ShopRoutes),
      }
>>>>>>> 8af811041b5e8d3d1db3cfdbc5d974050f5a80b7
    ],
  },
  {
    path: 'admin',
    canActivateChild: [AuthAdminGuard],
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/Admin/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'brands',
        loadChildren: () =>
          import('./pages/Admin/brands/brands.routes').then(
            (m) => m.BrandsRoutes
          ),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./pages/Admin/categories/categories.routes').then(
            (m) => m.CategoriesRoutes
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./pages/Admin/products/products.routes').then(
            (m) => m.ProductsRoutes
          ),
      },
      {
        path: 'size_variation',
        loadChildren: () =>
          import('./pages/Admin/variant/size_variation/size_variation.routes').then(
            (m) => m.SizeVariantionRoutes
          ),
      },
      {
        path: 'color_variation',
        loadChildren: () =>
          import('./pages/Admin/variant/color_variation/color_variation.routes').then(
            (m) => m.ColorVariantionRoutes
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/Admin/extra/extra.routes').then((m) => m.ExtraRoutes),
      },
      {
        path: 'payment',
        loadChildren: () =>
          import('./pages/Admin/payment/payment.routes').then((m) => m.PaymentRoutes),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./pages/Admin/orders/orders.routes').then((m) => m.OrdersRoutes),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./pages/Admin/account/account.routes').then((m) => m.AcountRoutes),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/Admin/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
