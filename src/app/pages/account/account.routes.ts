import { Routes } from '@angular/router';

import { ListUsersComponent } from './list-users/list-users.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { ListAdminComponent } from './list-admin/list-admin.component';
import { AddAdminComponent } from './add-admin/add-admin.component';

export const AcountRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-users',
        component: ListUsersComponent,
      },
      {
        path: 'add-users',
        component: AddUsersComponent,
      },
      {
        path: 'list-admin',
        component: ListAdminComponent,
      },
      {
        path: 'add-admin',
        component: AddAdminComponent,
      },
    ],
  },
];
