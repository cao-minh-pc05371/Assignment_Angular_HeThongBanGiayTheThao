import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-brands',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './add-brands.component.html',
  styleUrl: './add-brands.component.scss'
})
export class AddBrandsComponent {
  brandForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.brandForm = this.fb.group({
      name: ['', Validators.required],
      logo: ['', Validators.required]
    });
  }

  addBrand() {
    if (this.brandForm.valid) {
      console.log('Thương hiệu mới:', this.brandForm.value);
      alert('Thêm thương hiệu thành công!');
      this.brandForm.reset();
    }
  }
}
