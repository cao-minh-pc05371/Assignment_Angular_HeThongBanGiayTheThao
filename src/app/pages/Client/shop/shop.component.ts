import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from 'src/app/services/apis/product.service';
import { CategoryService } from 'src/app/services/apis/category.service';
import { IProduct } from 'src/app/interface/products.interface';
import { ICategories } from 'src/app/interface/categories.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from 'src/environments/environment';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    RouterLink,
    FormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  products: IProduct[] = [];
  categories: ICategories[] = [];
  isLoading = false;
  selectedCategoryId: number | null = null;
  apiBaseUrl = environment.apiUrl;
  hasError = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.categoryService.getAllCategories().subscribe({
      next: (response: any) => {
        console.log('Categories loaded:', response);
        if (Array.isArray(response)) {
          this.categories = response;
        } else if (response.data) {
          this.categories = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.hasError = true;
        this.errorMessage = 'Không thể tải danh mục';
        this.isLoading = false;
      }
    });
  }

  loadProducts(categoryId?: number): void {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.products = categoryId
            ? data.filter((product) => product.category_id === categoryId)
            : data;
        } else {
          console.error('Dữ liệu sản phẩm không phải là mảng:', data);
          this.products = [];
          this.showMessage(
            'Không thể tải sản phẩm. Dữ liệu không đúng định dạng.'
          );
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Lỗi khi tải sản phẩm:', error);
        this.isLoading = false;
        this.hasError = true;
        this.errorMessage = 'Không thể tải sản phẩm.';
        this.showMessage('Không thể tải sản phẩm. Vui lòng thử lại sau.');
      },
    });
  }

  filterByCategory(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    if (categoryId === null) {
      this.loadProducts();
    } else {
      this.loadProducts(categoryId);
    }
  }

  getImageUrl(image: string | undefined): string {
    if (!image) return 'assets/images/no-image.png';
    if (image.startsWith('http')) return image;
    return `${this.apiBaseUrl}/images/${image}`;
  }

  addToCart(productId: number): void {
    console.log('Thêm sản phẩm vào giỏ hàng:', productId);
    this.showMessage('Tính năng đang được phát triển');
  }

  buyNow(productId: number): void {
    this.router.navigate(['/shop', productId]);
  }

  showMessage(message: string): void {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
