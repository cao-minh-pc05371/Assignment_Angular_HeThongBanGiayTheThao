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

  loadInitialData() {
    this.loadCategories();
    this.loadBrands();
    this.loadProduct();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (res: any) => this.categories = res?.data ?? res,
      error: err => console.error('Lỗi danh mục:', err)
    });
  }

  loadBrands(): void {
    this.brandService.getAllBrands().subscribe({
      next: (res: any) => this.brands = res?.data ?? res,
      error: err => console.error('Lỗi thương hiệu:', err)
    });
  }

  loadProduct(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (product: IProduct) => {
        this.productForm.patchValue({ ...product });
        this.previewUrl = product.image ?? null;
      },
      error: err => console.error('Lỗi tải sản phẩm:', err)
    });
  }

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

  editProduct(): void {
    if (this.productForm.invalid) return;
    this.loading = true;

    const formValue = this.productForm.value;

    const updateProduct = (imageUrl: string) => {
      const payload = {
        ...formValue,
        image: imageUrl
      };

      this.productService.editProduct(this.productId, payload).subscribe({
        next: () => {
          this.router.navigate(['/admin/products/List-products']);
        },
        error: err => {
          console.error('❌ Lỗi khi cập nhật:', err);
        },
        complete: () => this.loading = false
      });
    };

    // Nếu có ảnh mới → upload
    if (this.selectedImage) {
      this.cloudinaryService.uploadImage(this.selectedImage).subscribe({
        next: (url: string) => updateProduct(url),
        error: err => {
          console.error('❌ Lỗi upload ảnh:', err);
          this.loading = false;
        }
      });
    } else {
      // Giữ ảnh cũ
      updateProduct(formValue.image);
    }
  }

  get name() { return this.productForm.get('name'); }
  get description() { return this.productForm.get('description'); }
}
