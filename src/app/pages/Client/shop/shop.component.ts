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
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

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
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products: IProduct[] = [];
  categories: ICategories[] = [];
  isLoading = false;
  selectedCategoryId: number | null = null;
  apiBaseUrl = environment.apiUrl;
  hasError = false;
  errorMessage = '';
  searchQuery: string = '';
  filteredProducts: any[] = [];
  paginatedProducts: any[] = [];
  pageSize: number = 8;
  currentPage: number = 1;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
    this.filteredProducts = this.products;
    this.updatePagination();
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
        this.filteredProducts = this.products;
        this.updatePagination();
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

  onSearch(): void {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.updatePagination();
  }

  updatePagination(): void {
    if (this.filteredProducts) {
      this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.paginateProducts();
    }
  }

  paginateProducts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.paginateProducts();
  }

  sortByPrice(order: string) {
    if (order === 'asc') {
      this.products.sort((a, b) => {
        if (a.price && b.price) {
          return a.price - b.price;
        }
        return 0;  // Nếu giá trị price không hợp lệ, giữ nguyên thứ tự
      });
    } else if (order === 'desc') {
      this.products.sort((a, b) => {
        if (a.price && b.price) {
          return b.price - a.price;
        }
        return 0;  // Nếu giá trị price không hợp lệ, giữ nguyên thứ tự
      });
    }
    this.filteredProducts = this.products;  // Cập nhật lại sản phẩm đã sắp xếp
    this.updatePagination();  // Cập nhật phân trang
  }
}
