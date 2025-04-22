import { Routes } from '@angular/router';

import { OrdersComponent } from './orders.component';

export const OrdersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: OrdersComponent,
      }
    ],
  },
];
