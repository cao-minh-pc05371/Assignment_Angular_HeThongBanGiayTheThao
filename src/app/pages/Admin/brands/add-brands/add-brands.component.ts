import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
<<<<<<< HEAD
import { BrandService } from 'src/app/services/apis/brands.service';
import { IBrands } from 'src/app/interface/brands.interface';
import { CloudinaryService } from 'src/app/services/common/cloudinary.service';
import { Router } from '@angular/router';
=======
import { Router } from '@angular/router';
import { BrandService } from 'src/app/services/apis/brands.service';
import { IAlertMessage } from 'src/app/interface/alert-message.interface';
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a

@Component({
  selector: 'app-add-brands',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule],
  templateUrl: './add-brands.component.html',
  styleUrls: ['./add-brands.component.scss']
})
export class AddBrandsComponent {
  brandForm: FormGroup;
<<<<<<< HEAD
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    private cloudinaryService: CloudinaryService,
    private router: Router
=======
  previewUrl: string | ArrayBuffer | null = null;
  alertMessages: IAlertMessage[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private brandService: BrandService
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
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
<<<<<<< HEAD
  }

  onSubmit() {
    if (this.brandForm.invalid || !this.selectedFile) {
      return;
=======

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
      
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
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
