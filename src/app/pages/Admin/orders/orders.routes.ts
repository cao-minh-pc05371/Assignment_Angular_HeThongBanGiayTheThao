import { Routes } from '@angular/router';

import { OrdersComponent } from './orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

export const OrdersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: OrdersComponent,
      },
      {
        path: ':id',
        component: OrderDetailComponent,
      }
    ],
  },
];
