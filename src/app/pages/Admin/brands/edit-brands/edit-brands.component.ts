<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BrandService } from 'src/app/services/apis/brands.service';
import { CloudinaryService } from 'src/app/services/common/cloudinary.service';
import { IBrands } from 'src/app/interface/brands.interface';

@Component({
  selector: 'app-edit-brands',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule],
  templateUrl: './edit-brands.component.html',
  styleUrl: './edit-brands.component.scss'
})
export class EditBrandsComponent implements OnInit {
  brandForm: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  brandId!: number;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private brandService: BrandService,
    private cloudinaryService: CloudinaryService
  ) {
    this.brandForm = this.fb.group({
      name: ['', Validators.required],
      logo: ['', Validators.required]
    });
  }

  get name() {
    return this.brandForm.get('name');
  }

  get logo() {
    return this.brandForm.get('logo');
  }

  ngOnInit(): void {
    this.brandId = +this.route.snapshot.paramMap.get('id')!;
    this.loadBrand();
  }

  loadBrand() {
    this.brandService.getBrandById(this.brandId).subscribe({
      next: (brand: IBrands) => {
        this.brandForm.patchValue({
          name: brand.name,
          logo: brand.logo
        });
        this.previewUrl = brand.logo;
      },
      error: err => {
        console.error('Không tải được thương hiệu', err);
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.brandForm.patchValue({ logo: file });
      this.brandForm.get('logo')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.brandForm.invalid) {
      return;
    }

    this.loading = true;

    const updateBrand = (logoUrl: string) => {
      const data: IBrands = {
        id: this.brandId,
        name: this.brandForm.value.name,
        logo: logoUrl
      };

      this.brandService.updateBrand(this.brandId, data).subscribe({
        next: () => {
          this.router.navigate(['/admin/brands/List-brands']);
        },
        error: err => {
          console.error('Lỗi khi cập nhật:', err);
        },
        complete: () => this.loading = false
      });
    };

    // Nếu có file mới thì upload lên Cloudinary trước
    if (this.selectedFile) {
      this.cloudinaryService.uploadImage(this.selectedFile).subscribe({
        next: (url: string) => updateBrand(url),
        error: err => {
          console.error('Lỗi upload ảnh:', err);
          this.loading = false;
        }
      });
    } else {
      // Nếu không thay logo, dùng lại logo cũ
      updateBrand(this.brandForm.value.logo);
    }
  }
=======
import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-brands',
  imports: [],
  templateUrl: './edit-brands.component.html',
  styleUrl: './edit-brands.component.scss'
})
export class EditBrandsComponent {

>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
}
