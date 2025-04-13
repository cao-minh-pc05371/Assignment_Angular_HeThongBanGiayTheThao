import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
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
  templateUrl: './side-register.component.html',
  styleUrls: ['./side-register.component.scss'],
  standalone: true,
})
export class AppSideRegisterComponent {
  registerForm!: FormGroup;
  formError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^0[0-9]{9}$/)]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
    );
  }

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    this.formError = null;

    // 👉 Bắt buộc đánh dấu form touched để hiển thị lỗi
    this.registerForm.markAllAsTouched();

    // Gọi lại để cập nhật lỗi khi submit
    const errors = this.passwordsMatchValidator(this.registerForm);
    if (errors?.['passwordMismatch']) {
      this.registerForm.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    }
    // Nếu form không hợp lệ thì dừng
    if (this.registerForm.invalid) return;

    // Xử lý đăng ký
    const { confirmPassword, ...data } = this.registerForm.value;
    this.authService.register(data).subscribe({
      next: () => {
        this.snackBar.open('🎉 Đăng ký thành công!', 'Đăng nhập', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        const message = err?.error?.message || 'Đăng ký thất bại';
        if (message.includes('Email đã tồn tại')) {
          this.registerForm.get('email')?.setErrors({ emailExists: true });
        } else {
          this.formError = message;
        }
      }
    });
  }

}
