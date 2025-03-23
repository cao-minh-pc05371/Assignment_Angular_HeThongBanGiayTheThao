import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IAccount } from 'src/app/interface/accounts.interface';

@Component({
  selector: 'app-list-users',
  imports: [MatCardModule, CommonModule, MatIconModule],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent {
  accounts: IAccount[] = [
    {
      id: 1,
      username: 'user1',
      name: 'User 1',
      password: '123',
      email: 'user@example.com',
      role: 'user'
    },
    {
      id: 2,
      username: 'user2',
      name: 'User 2',
      password: '123',
      email: 'user@example.com',
      role: 'user'
    },
    {
      id: 3,
      username: 'user3',
      name: 'User 3',
      password: '123',
      email: 'user@example.com',
      role: 'user'
    }
  ]
}
