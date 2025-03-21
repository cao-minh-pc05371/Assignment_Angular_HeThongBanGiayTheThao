import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'brands',
        loadChildren: () =>
          import('./pages/brands/brands.routes').then(
            (m) => m.BrandsRoutes
          ),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./pages/categories/categories.routes').then(
            (m) => m.CategoriesRoutes
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./pages/products/products.routes').then(
            (m) => m.ProductsRoutes
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
      },
      {
        path: 'payment',
        loadChildren: () =>
          import('./pages/payment/payment.routes').then((m) => m.PaymentRoutes),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./pages/orders/orders.routes').then((m) => m.OrdersRoutes),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./pages/account/account.routes').then((m) => m.AcountRoutes),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
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
