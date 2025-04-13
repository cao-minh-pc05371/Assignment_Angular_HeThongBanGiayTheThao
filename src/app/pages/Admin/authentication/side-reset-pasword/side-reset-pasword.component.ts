import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app/services/apis/user_auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-register',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, MatSnackBarModule, CommonModule],
  templateUrl: './side-reset-pasword.component.html',
  styleUrls: ['./side-reset-pasword.component.scss'],
  standalone: true,
})
export class AppSideResetPasswordComponent {
  resetForm!: FormGroup;
  formError: string | null = null;
  step: number = 1;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^0[0-9]{9}$/)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.resetForm.get('newPassword')?.disable();
  }

  onVerifyAccount(): void {
    this.formError = null;
    this.resetForm.markAllAsTouched();

    if (this.resetForm.invalid) return;

    const { email, phone } = this.resetForm.value;

    this.authService.resetPassword({ email, phone, newPassword: 'verify_temp' }).subscribe({
      next: () => {
        this.snackBar.open('Thông tin hợp lệ. Vui lòng nhập mật khẩu mới.', 'Tiếp tục', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });
        this.step = 2;
        this.resetForm.get('newPassword')?.enable();
        this.resetForm.get('newPassword')?.markAsUntouched();
        this.resetForm.get('newPassword')?.updateValueAndValidity();
      },
      error: (err) => {
        const message = err?.error?.message || 'Không thể xác minh thông tin';
        if (message.includes('Email không tồn tại')) {
          this.resetForm.get('email')?.setErrors({ notFound: true });
        } else if (message.includes('Email đúng nhưng số điện thoại không đúng')) {
          this.resetForm.get('phone')?.setErrors({ mismatch: true });
        } else {
          this.formError = message;
        }
      }
    });
  }

  onUpdatePassword(): void {
    this.formError = null;
    this.resetForm.markAllAsTouched();

    if (this.resetForm.invalid) return;

    const { email, phone, newPassword } = this.resetForm.value;

    this.authService.resetPassword({ email, phone, newPassword }).subscribe({
      next: () => {
        this.snackBar.open('Cập nhật mật khẩu thành công!', 'Đăng nhập', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        const message = err?.error?.message || 'Không thể cập nhật mật khẩu';
        this.resetForm.get('newPassword')?.setErrors({ serverError: true });
        this.formError = message;
        this.step = 1;
        this.resetForm.get('newPassword')?.disable();
      }
    });
  }

}
