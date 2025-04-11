import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

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

  constructor(private fb: FormBuilder) {
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
      this.brandForm.patchValue({ logo: null });
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

    // File hợp lệ
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
      formData.append('name', this.brandForm.get('name')?.value);
      formData.append('logo', this.brandForm.get('logo')?.value);

      // Log FormData
      console.log('Dữ liệu form:');
      for (const pair of (formData as any).entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }      

      alert('Thêm thương hiệu thành công!');
      this.brandForm.reset();
      this.previewUrl = null;
    }
  }
}
