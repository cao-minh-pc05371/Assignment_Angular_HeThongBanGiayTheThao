import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from 'src/app/services/apis/product.service';
import { CategoryService } from 'src/app/services/apis/category.service';
import { BrandService } from 'src/app/services/apis/brands.service';
import { CloudinaryService } from 'src/app/services/common/cloudinary.service';
import { ICategories } from 'src/app/interface/categories.interface';
import { IBrands } from 'src/app/interface/brands.interface';
import { IProduct } from 'src/app/interface/products.interface';

@Component({
  selector: 'app-edit-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule],
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.scss']
})
export class EditProductsComponent implements OnInit {
  productForm!: FormGroup;
  productId!: number;
  selectedImage!: File;
  previewUrl: string | ArrayBuffer | null = null;
  categories: ICategories[] = [];
  brands: IBrands[] = [];
  loading = false;
  hasError = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
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
      stock: [0, Validators.required],
      category_id: [null, Validators.required],
      brand_id: [null, Validators.required],
      visibility: ['visible', Validators.required],
      featured: ['normal', Validators.required],
      image: ['']
    });

    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.loadInitialData();
  }

  loadInitialData(): void {
    // Load categories and brands first
    Promise.all([
      new Promise<void>((resolve) => {
        this.categoryService.getAllCategories().subscribe({
          next: (res) => {
            console.log('Categories loaded:', res);
            this.categories = Array.isArray(res.data) ? res.data : [];
            resolve();
          },
          error: (err) => {
            console.error('Lỗi khi tải danh mục:', err);
            this.categories = [];
            resolve();
          }
        });
      }),
      new Promise<void>((resolve) => {
        this.brandService.getAllBrands().subscribe({
          next: (res) => {
            console.log('Brands loaded:', res);
            this.brands = Array.isArray(res.data) ? res.data : [];
            resolve();
          },
          error: (err) => {
            console.error('Lỗi khi tải thương hiệu:', err);
            this.brands = [];
            resolve();
          }
        });
      })
    ]).then(() => {
      // Load product after categories and brands are loaded
      this.loadProduct();
    });
  }

  // Tải sản phẩm từ ProductService
  loadProduct(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (product: IProduct) => {
        // Convert IDs to numbers
        const categoryId = typeof product.category_id === 'string' ? 
          parseInt(product.category_id) : product.category_id;
        const brandId = typeof product.brand_id === 'string' ? 
          parseInt(product.brand_id) : product.brand_id;

        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          sale_price: product.sale_price,
          stock: product.stock,
          category_id: categoryId,
          brand_id: brandId,
          visibility: product.visibility,
          featured: product.featured,
          image: product.image
        });
        
        // Force form controls to mark as touched to trigger validation
        Object.keys(this.productForm.controls).forEach(key => {
          const control = this.productForm.get(key);
          control?.markAsTouched();
        });

        this.previewUrl = product.image ?? null;
      },
      error: (err) => {
        console.error('Lỗi tải sản phẩm:', err);
        this.hasError = true;
        this.errorMessage = 'Không thể tải sản phẩm.';
      }
    });
  }

  // Xử lý khi thay đổi ảnh
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.selectedImage = file;
      this.productForm.get('image')?.setValue(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Cập nhật sản phẩm
  editProduct(): void {
    if (this.productForm.invalid) {
      this.hasError = true;
      this.errorMessage = 'Vui lòng điền đầy đủ thông tin bắt buộc';
      return;
    }
    this.loading = true;
    this.hasError = false;

    const formValue = this.productForm.value;

    // Validate required fields
    if (!formValue.name || !formValue.price || !formValue.category_id || !formValue.brand_id) {
      this.hasError = true;
      this.errorMessage = 'Vui lòng điền đầy đủ thông tin bắt buộc';
      this.loading = false;
      return;
    }

    const updateProduct = (imageUrl: string) => {
      const payload = {
        ...formValue,
        image: imageUrl,
        price: Number(formValue.price),
        sale_price: Number(formValue.sale_price),
        stock: Number(formValue.stock)
      };

      this.productService.updateProduct(this.productId, payload).subscribe({
        next: () => {
          this.router.navigate(['/admin/products/List-products']);
        },
        error: (err) => {
          console.error('❌ Lỗi khi cập nhật:', err);
          this.hasError = true;
          this.errorMessage = 'Không thể cập nhật sản phẩm. Vui lòng thử lại!';
          this.loading = false;
        },
        complete: () => this.loading = false
      });
    };

    // Nếu có ảnh mới → upload
    if (this.selectedImage) {
      this.cloudinaryService.uploadImage(this.selectedImage).subscribe({
        next: (url: string) => updateProduct(url),
        error: (err) => {
          console.error('❌ Lỗi upload ảnh:', err);
          this.loading = false;
        }
      });
    } else {
      // Giữ ảnh cũ
      updateProduct(formValue.image);
    }
  }

  // Getter cho các form control
  get name() { return this.productForm.get('name'); }
  get description() { return this.productForm.get('description'); }
  get price() { return this.productForm.get('price'); }
  get sale_price() { return this.productForm.get('sale_price'); }
  get stock() { return this.productForm.get('stock'); }
  get category_id() { return this.productForm.get('category_id'); }
  get brand_id() { return this.productForm.get('brand_id'); }
  get visibility() { return this.productForm.get('visibility'); }
  get featured() { return this.productForm.get('featured'); }
}
