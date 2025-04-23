import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IUser } from 'src/app/interface/user.interface';
import { UserService } from 'src/app/services/apis/user_auth.service';

@Component({
  selector: 'app-add-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.scss'
})
export class AddUsersComponent {
  userForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  submitted = false;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['', [this.roleValidator]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  roleValidator(control: AbstractControl): ValidationErrors | null {
    return control.value ? null : { required: true };
  }

  addUser(): void {
    this.submitted = true;

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const { confirmPassword, ...payload }: any = this.userForm.value;

    this.userService.addUser(payload).subscribe({
      next: (user: IUser) => {
        this.successMessage = 'Tạo tài khoản thành công!';
        this.errorMessage = '';
        this.userForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        this.successMessage = '';
        this.errorMessage = err.error?.message || 'Tạo tài khoản thất bại.';
      }
    });
  }
}