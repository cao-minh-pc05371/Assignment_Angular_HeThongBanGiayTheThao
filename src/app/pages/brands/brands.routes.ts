import { Routes } from '@angular/router';

import { ListBrandsComponent } from './list-brands/list-brands.component'; 
import { AddBrandsComponent } from './add-brands/add-brands.component';

export const BrandsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'List-brands',
        component: ListBrandsComponent,
      },
      {
        path: 'Add-brands',
        component: AddBrandsComponent,
      },
    ],
  },
];
