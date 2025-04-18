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
<<<<<<< HEAD
import { CloudinaryService } from 'src/app/services/common/cloudinary.service';
=======
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    MatCardModule,
=======
    MatCardModule
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
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
<<<<<<< HEAD
  loading = false;
=======
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
<<<<<<< HEAD
    private brandService: BrandService,
    private cloudinaryService: CloudinaryService
=======
    private brandService: BrandService
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      sale_price: [0],
<<<<<<< HEAD
      stock: [0],
=======
      stock: [null, [Validators.required, Validators.min(1)]],
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
      category_id: [null, Validators.required],
      brand_id: [null, Validators.required],
      visibility: ['visible', Validators.required],
      featured: ['normal', Validators.required],
<<<<<<< HEAD
      image: ['', Validators.required]
=======
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
    });

    this.loadCategories();
    this.loadBrands();
  }

  get name() { return this.productForm.get('name'); }
  get description() { return this.productForm.get('description'); }
<<<<<<< HEAD
  get image() { return this.productForm.get('image'); }
=======
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.selectedImage = file;
<<<<<<< HEAD
      this.productForm.patchValue({ image: file });
      this.productForm.get('image')?.updateValueAndValidity();

=======
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addProduct(): void {
<<<<<<< HEAD
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
=======
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
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
      }
    });
  }

<<<<<<< HEAD
  // Lấy danh mục
  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response: any) => {
        console.log('Category Response:', response);
        if (response.categories) {
          this.categories = response.categories;
        } else if (Array.isArray(response)) {
          this.categories = response;
        } else if (response.data) {
          this.categories = response.data;
        }
        console.log('Processed Categories:', this.categories);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
        this.categories = [];
      }
=======
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
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
    });
  }

  // Lấy thương hiệu
  loadBrands(): void {
    this.brandService.getAllBrands().subscribe({
      next: (response: any) => {
        console.log('Brand Response:', response);
        if (response.brands) {
          this.brands = response.brands;
        } else if (Array.isArray(response)) {
          this.brands = response;
        } else if (response.data) {
          this.brands = response.data;
        }
        console.log('Processed Brands:', this.brands);
      },
      error: (err) => {
        console.error('Error loading brands:', err);
        this.brands = [];
      }
    });
  }
}
