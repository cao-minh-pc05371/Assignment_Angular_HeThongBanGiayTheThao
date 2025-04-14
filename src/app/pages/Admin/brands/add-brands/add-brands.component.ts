import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { BrandService } from 'src/app/services/apis/brands.service';
import { IAlertMessage } from 'src/app/interface/alert-message.interface';

@Component({
  selector: 'app-add-brands',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule],
  templateUrl: './add-brands.component.html',
  styleUrl: './add-brands.component.scss'
})
export class AddBrandsComponent {
  brandForm: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;
  alertMessages: IAlertMessage[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private brandService: BrandService
  ) {
    this.brandForm = this.fb.group({
      name: ['', Validators.required],
      logo: [null, Validators.required]
    });
  }

  get name() {
    return this.brandForm.get('name');
  }

  get logo() {
    return this.brandForm.get('logo');
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];

    if (!file) {
      this.logo?.setErrors({ required: true });
      this.previewUrl = null;
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      this.brandForm.patchValue({ logo: file });
      this.logo?.setErrors({ invalidType: true });
      this.previewUrl = null;
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      this.brandForm.patchValue({ logo: null });
      this.logo?.setErrors({ tooLarge: true });
      this.previewUrl = null;
      return;
    }

    this.brandForm.patchValue({ logo: file });
    this.logo?.setErrors(null);

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  addBrand() {
    if (this.brandForm.valid) {
      const formData = new FormData();
      formData.append('name', this.brandForm.get('name')?.value.trim());
      formData.append('logo', this.brandForm.get('logo')?.value);

      this.brandService.addBrand(formData).subscribe({
        next: () => {
          this.alertMessages = [
            { message: '🎉 Thêm thương hiệu thành công!', status: 'success' }
          ];
          this.brandForm.reset();
          this.previewUrl = null;
          setTimeout(() => {
            this.router.navigate(['/admin/brands/List-brands']);
          }, 3000);
        },
        error: (err) => {
          console.error('Thêm thất bại:', err);
          this.alertMessages = [
            { message: '❌ Thêm thương hiệu thất bại', status: 'danger' }
          ];
        }
      });
      
    }
  }
}
