import { Routes } from '@angular/router';

import { ListBrandsComponent } from './list-brands/list-brands.component'; 
import { AddBrandsComponent } from './add-brands/add-brands.component';
import { EditBrandsComponent } from './edit-brands/edit-brands.component';

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
      {
        path: 'Edit-brands/:id',
        component: EditBrandsComponent,
      },
    ],
  },
];
