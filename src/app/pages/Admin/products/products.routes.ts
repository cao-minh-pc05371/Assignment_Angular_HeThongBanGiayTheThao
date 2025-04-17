import { Routes } from '@angular/router';

import { ListProductsComponent } from './list-products/list-products.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { DetailProductsComponent } from './detail-products/detail-products.component';

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
      {
        path: 'Edit-products/:id',
        component: EditProductsComponent,
      },
      {
        path: 'Detail-products/:id',
        component: DetailProductsComponent,
      },
    ],
  },
];
