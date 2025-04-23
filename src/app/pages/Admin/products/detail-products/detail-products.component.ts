import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interface/products.interface';
import { ProductService } from 'src/app/services/apis/product.service';
import { ListVariantProductComponent } from "../../variant_product/list-variant-product/list-variant-product.component";

@Component({
  selector: 'app-detail-products',
  imports: [MatCardModule, CommonModule, ListVariantProductComponent],
  templateUrl: './detail-products.component.html',
  styleUrl: './detail-products.component.scss'
})
export class DetailProductsComponent {
  product!: IProduct;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getProductDetails(id);
    } else {
      this.errorMessage = 'Không tìm thấy sản phẩm!';
      this.isLoading = false;
    }
  }

  getProductDetails(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (res: IProduct) => {
        this.product = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Không thể tải sản phẩm!';
        this.isLoading = false;
        console.error('❌ Lỗi khi lấy sản phẩm:', err);
      },
    });
  }
}