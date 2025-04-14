import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from 'src/app/services/apis/product.service';
import { CategoryService } from 'src/app/services/apis/category.service';
import { BrandService } from 'src/app/services/apis/brands.service';
import { ICategories } from 'src/app/interface/categories.interface';
import { IBrands } from 'src/app/interface/brands.interface';
import { CloudinaryService } from 'src/app/services/common/cloudinary.service';

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
  productForm!: FormGroup;
  categories: ICategories[] = [];
  brands: IBrands[] = [];
  selectedImage!: File;
  previewUrl: string | ArrayBuffer | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private cloudinaryService: CloudinaryService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      sale_price: [0],
      stock: [0],
      category_id: [null, Validators.required],
      brand_id: [null, Validators.required],
      visibility: ['visible', Validators.required],
      featured: ['normal', Validators.required],
      image: ['', Validators.required]
    });

    this.loadCategories();
    this.loadBrands();
  }

  get name() { return this.productForm.get('name'); }
  get description() { return this.productForm.get('description'); }
  get image() { return this.productForm.get('image'); }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.selectedImage = file;
      this.productForm.patchValue({ image: file });
      this.productForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addProduct(): void {
    if (this.productForm.invalid || !this.selectedImage) return;
    this.loading = true;

    this.cloudinaryService.uploadImage(this.selectedImage).subscribe({
      next: (imageUrl: string) => {
        const formValue = this.productForm.value;

        const payload = {
          name: formValue.name,
          description: formValue.description,
          price: formValue.price,
          sale_price: formValue.sale_price,
          stock: formValue.stock,
          category_id: formValue.category_id,
          brand_id: formValue.brand_id,
          visibility: formValue.visibility,
          featured: formValue.featured,
          image: imageUrl
        };

        this.productService.addProduct(payload).subscribe({
          next: () => {
            this.router.navigate(['/admin/products/List-products']);
          },
          error: err => {
            console.error('❌ Thêm sản phẩm thất bại:', err);
            alert('Đã xảy ra lỗi khi thêm sản phẩm!');
          },
          complete: () => this.loading = false
        });
      },
      error: err => {
        console.error('❌ Upload ảnh thất bại:', err);
        alert('Lỗi khi upload ảnh');
        this.loading = false;
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res?.data ?? res;
      },
      error: (err) => console.error('Lỗi khi lấy danh mục:', err)
    });
  }

  loadBrands(): void {
    this.brandService.getAllBrands().subscribe({
      next: (res: any) => {
        this.brands = res?.data ?? res;
      },
      error: (err) => console.error('Lỗi khi lấy thương hiệu:', err)
    });
  }
}
