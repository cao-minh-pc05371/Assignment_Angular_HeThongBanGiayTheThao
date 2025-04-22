import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/apis/user_auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userId!: number;
  user: any;
  constructor(private authService: AuthService) {}
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/'; // hoặc dùng Router.navigate
  }

  showDropdown: boolean = false;

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  ngOnInit(): void {
    this.getUserInfo();  // Lấy thông tin người dùng
  }

  getUserInfo(): void {
    const userId = localStorage.getItem('userId'); // Hoặc bạn có thể lấy từ sessionStorage hoặc các nơi khác

    if (userId) {
      this.authService.getProfile(Number(userId)).subscribe(
        (data) => {
          this.user = data;  // Gán thông tin người dùng vào biến user
        },
        (error) => {
          console.error('Không thể lấy thông tin người dùng', error);
        }
      );
    } else {
      console.error('Không có userId trong storage');
    }
  }
}
