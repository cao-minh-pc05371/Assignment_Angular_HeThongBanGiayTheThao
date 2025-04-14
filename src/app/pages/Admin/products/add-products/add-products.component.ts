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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      sale_price: [0],
      stock: [null, [Validators.required, Validators.min(1)]],
      category_id: [null, Validators.required],
      brand_id: [null, Validators.required],
      visibility: ['visible', Validators.required],
      featured: ['normal', Validators.required],
    });

    this.loadCategories();
    this.loadBrands();
  }

  get name() { return this.productForm.get('name'); }
  get description() { return this.productForm.get('description'); }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addProduct(): void {
    if (this.productForm.invalid) return;

    const formData = new FormData();
    const formValue = this.productForm.value;

    formData.append('name', formValue.name);
    formData.append('description', formValue.description);
    formData.append('price', formValue.price?.toString() ?? '0');
    formData.append('sale_price', formValue.sale_price?.toString() ?? '0');
    formData.append('stock', formValue.stock?.toString() ?? '0');
    formData.append('category_id', formValue.category_id?.toString() ?? '');
    formData.append('brand_id', formValue.brand_id?.toString() ?? '');
    formData.append('visibility', formValue.visibility);
    formData.append('featured', formValue.featured);
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.productService.addProduct(formData).subscribe({
      next: () => {
        alert('Thêm sản phẩm thành công!');
        this.router.navigate(['/admin/products']);
      },
      error: (err) => {
        console.error('Thêm sản phẩm thất bại:', err);
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