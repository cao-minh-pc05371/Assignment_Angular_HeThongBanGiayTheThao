import { Routes } from '@angular/router';

import { ListProductsComponent } from './list-products/list-products.component';
import { AddProductsComponent } from './add-products/add-products.component';

export const ProductsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'List-products',
        component: ListProductsComponent,
      },
      {
        path: 'Add-products',
        component: AddProductsComponent,
      },
    ],
  },
];
