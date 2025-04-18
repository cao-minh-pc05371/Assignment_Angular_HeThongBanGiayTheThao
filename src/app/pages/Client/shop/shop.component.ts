import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { ProductService } from 'src/app/services/apis/product.service';
import { CategoryService } from 'src/app/services/apis/category.service';
import { IProduct } from 'src/app/interface/products.interface';
import { ICategories } from 'src/app/interface/categories.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from 'src/environments/environment';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
=======

>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a

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
<<<<<<< HEAD
    FormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
=======
    FormsModule
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
<<<<<<< HEAD
export class ShopComponent implements OnInit {
  products: IProduct[] = [];
  categories: ICategories[] = [];
  isLoading = false;
  selectedCategoryId: number | null = null;
  apiBaseUrl = environment.apiUrl;
  hasError = false;
  errorMessage = '';
=======
export class ShopComponent {

  constructor(
    private router: Router
  ){}


  products = [
  {"productId": 1, name: 'Giày Nike Air Max 270', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlrsEd96yuOwXUmHH7Aps6CzY69qCmXGnDxw&s', price: 1000000 },
  {"productId": 2, name: 'Giày Adidas Ultraboost 21', image: 'https://png.pngtree.com/png-vector/20201128/ourlarge/pngtree-casual-shoes-png-image_2394294.jpg', price: 1200000 },
  {"productId": 3, name: 'Giày Puma RS-X3', image: 'https://product.hstatic.net/200000142885/product/z4121570251442_1ea4dad0962c57799e2306bf9b6cfe76_90c1420390b94518b2c2b45936bfbb88_master.jpg', price: 1500000 },
  {"productId": 5, name: 'Giày Nike Air Force 1', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkRPU7NANgivcef3l-TwfyL7Vkhr5kF3w30g&s', price: 1100000 },
  {"productId": 6, name: 'Giày Adidas NMD R1', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlrsEd96yuOwXUmHH7Aps6CzY69qCmXGnDxw&s', price: 900000 },
  {"productId": 7, name: 'Giày Nike Zoom Pegasus 38', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhxwvrpj7otPNoeBJkvpBDCPX8tPu0AoBtFg&s', price: 1400000 },
  {"productId": 8, name: 'Giày Reebok Classic', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_9TvfP9P0HdC0y3m62sVJVJ2bCpx-6Uz0IA&s', price: 1350000 },
  {"productId": 9, name: 'Giày Nike Air Zoom Winflo 8', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdAXZNBmAj3F-3MeLT7BB3TyaKSGOThFbrOA&s', price: 1250000 },
  {"productId": 10, name: 'Giày Adidas Superstar', image: 'https://png.pngtree.com/png-vector/20201128/ourlarge/pngtree-casual-shoes-png-image_2394294.jpg', price: 1600000 },
  {"productId": 11, name: 'Giày Nike Air Jordan 1', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkRPU7NANgivcef3l-TwfyL7Vkhr5kF3w30g&s', price: 2000000 },
  {"productId": 12, name: 'Giày Nike Air Max 90', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhxwvrpj7otPNoeBJkvpBDCPX8tPu0AoBtFg&s', price: 1800000 },
  {"productId": 13, name: 'Giày New Balance 990v5', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkRPU7NANgivcef3l-TwfyL7Vkhr5kF3w30g&s', price: 1100000 },
];
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a

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
