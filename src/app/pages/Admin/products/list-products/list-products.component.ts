import { Component, inject } from '@angular/core';
import { IProduct } from 'src/app/interface/products.interface';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
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
export class ListProductsComponent {
  readonly dialog = inject(MatDialog);
  products: IProduct[] = [];
  constructor(
    private productService: ProductService,
    private route: Router,
  ) { 
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        const rawProducts = res?.data ?? res;
        this.products = rawProducts.map((product: any) => ({
                  ...product,
                  image: `${product.image}`
                }));
        console.log('Categories:', this.products);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    })
  }

  openEditDialog(id: number, name: string) {
    // Điều hướng tới trang sửa, ví dụ: /edit/5
    this.route.navigate(['/admin/products/Edit-products', id]);
  }
  
}
