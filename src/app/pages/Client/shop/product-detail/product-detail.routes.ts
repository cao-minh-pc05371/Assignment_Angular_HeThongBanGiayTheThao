// product-detail.routes.ts
import { Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';
import { ShopComponent } from '../shop.component';

export const ProductDetailRoutes: Routes = [
  {
    path: '',
    component: ProductDetailComponent,
  },
];