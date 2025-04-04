import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IAccount } from 'src/app/interface/accounts.interface';

@Component({
  selector: 'app-list-admin',
  imports: [MatCardModule, CommonModule, MatIconModule],
  templateUrl: './list-admin.component.html',
  styleUrl: './list-admin.component.scss'
})
export class ListAdminComponent {
    accounts : IAccount[] = [
      {
        id: 1,
        username: 'admin1',
        name: 'Admin 1',
        password: '123',
        email: 'admin@example.com',
        role: 'admin'
      },
      {
        id: 2,
        username: 'admin2',
        name: 'Admin 2',
        password: '123',
        email: 'admin@example.com',
        role: 'admin'
      },
      {
        id: 3,
        username: 'admin3',
        name: 'Admin 3',
        password: '123',
        email: 'admin@example.com',
        role: 'admin'
      }
    ]
}
