import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IUser } from 'src/app/interface/user.interface';
import { UserService } from 'src/app/services/apis/user_auth.service';

@Component({
  selector: 'app-list-users',
  imports: [MatCardModule, CommonModule, MatIconModule],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent implements OnInit {
  accounts: IUser[] = [];
  loading = false;
  errorMessage = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.accounts = res.filter(user => user.role === 'customer');
        this.loading = false;
      },
      error: (err) => {
        console.error('Lỗi khi tải danh sách người dùng:', err);
        this.errorMessage = 'Không thể tải danh sách người dùng';
        this.loading = false;
      }
    });
  }
  
}
