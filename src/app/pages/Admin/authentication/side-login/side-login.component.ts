import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/apis/user.service';
import { ILoginResponse } from 'src/app/interface/auth.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './side-login.component.html',
  styleUrls: ['./side-login.component.scss'],
})
export class AppSideLoginComponent {
  loginForm!: FormGroup;
  formError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    this.formError = null;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: ILoginResponse) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Login failed', err);
        const message = err?.error?.error || err?.error?.message || 'Đăng nhập thất bại';
        this.formError = message;
      }
    });
  }
}

