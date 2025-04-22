import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/apis/user_auth.service';
import { IUser } from 'src/app/interface/user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user: IUser | null = null;
  errorMessage: string | null = null;
  isLoading = true;
  noAddress = 'Không có địa chỉ nào'; // Thêm dòng này
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute // ✅ Inject properly here
  ) {}

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.paramMap.get('id');

    if (userId) {
      this.authService.getProfile(Number(userId)).subscribe(
        (data: IUser) => {
          this.user = data;
          this.isLoading = false;
        },
        (error: HttpErrorResponse) => {
          console.error('Lỗi khi lấy thông tin user:', error);
          this.isLoading = false;
        }
      );
    } else {
      console.error('Không có id trong URL');
      this.isLoading = false;
    }
  }
}
