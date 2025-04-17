import { Routes } from '@angular/router';
import { AddVariantProductComponent } from './add-variant-product/add-variant-product.component';
import { EditVariantProductComponent } from './edit-variant-product/edit-variant-product.component';

export const VariantProductRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'add-variant-product/:id',
        component: AddVariantProductComponent,
      },
      {
        path: 'edit-variant-product/:id',
        component: EditVariantProductComponent,
      }
    ],
  },
];
