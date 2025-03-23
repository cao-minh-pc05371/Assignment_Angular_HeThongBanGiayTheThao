import { Routes } from '@angular/router';

import { ListUsersComponent } from './list-users/list-users.component';
import { AddUsersComponent } from './add-account/add-account.component';
import { ListAdminComponent } from './list-admin/list-admin.component';

export const AcountRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-users',
        component: ListUsersComponent,
      },
      {
        path: 'add',
        component: AddUsersComponent,
      },
      {
        path: 'list-admin',
        component: ListAdminComponent,
      },
    ],
  },
];
