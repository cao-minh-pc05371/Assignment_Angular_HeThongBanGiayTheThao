import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BrandService } from 'src/app/services/apis/brands.service';
import { IBrands } from 'src/app/interface/brands.interface';
import { CloudinaryService } from 'src/app/services/common/cloudinary.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-brands',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule],
  templateUrl: './add-brands.component.html',
  styleUrls: ['./add-brands.component.scss']
})
export class AddBrandsComponent {
  brandForm: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    private cloudinaryService: CloudinaryService,
    private router: Router
  ) {
    this.brandForm = this.fb.group({
      name: ['', Validators.required],
      logo: ['', Validators.required]  // Thêm vào form control để validate logo
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
    if (file) {
      this.selectedFile = file;
      this.brandForm.patchValue({ logo: file });  // cập nhật giá trị vào form
      this.brandForm.get('logo')?.updateValueAndValidity();

      // Hiển thị preview
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.brandForm.invalid || !this.selectedFile) {
      return;
    }

    this.loading = true;

    this.cloudinaryService.uploadImage(this.selectedFile).subscribe({
      next: (url: string) => {
        const formData: IBrands = {
          id : 0,
          name: this.brandForm.value.name,
          logo: url
        };

        this.brandService.addBrand(formData).subscribe({
          next: () => {
            this.router.navigate(['/admin/brands/List-brands']);
          },
          error: err => {
            console.error(err);
            alert('❌ Lỗi khi thêm thương hiệu');
          },
          complete: () => this.loading = false
        });
      },
      error: err => {
        console.error(err);
        alert('❌ Lỗi khi upload ảnh');
        this.loading = false;
      }
    });
  }
}
