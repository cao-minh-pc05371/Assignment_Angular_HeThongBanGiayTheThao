import { Routes } from '@angular/router';

import { CategoriesListComponent } from './categories-list/categories-list.component'; 
import { CategoriesAddComponent } from './categories-add/categories-add.component';

export const CategoriesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'List-Categories',
        component: CategoriesListComponent,
      },
      {
        path: 'Add-Categories',
        component: CategoriesAddComponent,
      },
    ],
  },
];
