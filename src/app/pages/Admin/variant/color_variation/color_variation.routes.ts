import { Routes } from '@angular/router';

import { ListColorComponent } from './list-color/list-color.component';
import { AddColorComponent } from './add-color/add-color.component';
import { EditColorComponent } from './edit-color/edit-color.component';

export const ColorVariantionRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-color-variant',
        component: ListColorComponent,
      },
      {
        path: 'add-color-variant',
        component: AddColorComponent,
      },
      {
        path: 'edit-color-variant/:id',
        component: EditColorComponent,
      }
    ],
  },
];
