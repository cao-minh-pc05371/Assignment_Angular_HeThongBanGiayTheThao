import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interface/products.interface';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/apis/product.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-products',
  imports: [MatCardModule, CommonModule, MatIconModule],
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  products: IProduct[] = [];
  loading = false;
  hasError = false;
  errorMessage = '';

  constructor(
    private productService: ProductService,
    private route: Router,
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  // Lấy tất cả sản phẩm
  getAllProducts() {
    this.loading = true; // Bắt đầu loading
    this.productService.getAllProducts().subscribe({
      next: (res: IProduct[]) => {
        this.products = res;
        console.log('Sản phẩm:', this.products);
        this.loading = false; // Xong loading
      },
      error: (err) => {
        console.error('Lỗi khi lấy sản phẩm:', err);
        this.hasError = true;
        this.errorMessage = 'Không thể tải danh sách sản phẩm';
        this.loading = false; // Dừng loading nếu có lỗi
      },
    });
  }

  // Mở cửa sổ dialog chỉnh sửa sản phẩm
  openEditDialog(id: number, name: string) {
    // Điều hướng tới trang sửa sản phẩm
    this.route.navigate(['/admin/products/Edit-products', id]);
  }
}
