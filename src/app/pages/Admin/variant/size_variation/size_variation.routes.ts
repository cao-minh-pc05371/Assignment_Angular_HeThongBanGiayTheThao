import { Routes } from '@angular/router';

import { ListSizeComponent } from './list-size/list-size.component';
import { AddSizeComponent } from './add-size/add-size.component';
import { EditSizeComponent } from './edit-size/edit-size.component';

export const SizeVariantionRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-size-variant',
        component: ListSizeComponent,
      },
      {
        path: 'add-size-variant',
        component: AddSizeComponent,
      },
      {
        path: 'edit-size-variant/:id',
        component: EditSizeComponent,
      }
    ],
  },
];
