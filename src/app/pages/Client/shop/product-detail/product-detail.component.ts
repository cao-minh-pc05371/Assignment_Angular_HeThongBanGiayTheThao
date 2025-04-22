import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'; // ✅ FIXED: Thêm cái này để không lỗi
import { Router } from '@angular/router';  // Import Router
import { IProduct } from 'src/app/interface/products.interface';
import { IProductVariant } from 'src/app/interface/productvariant.interface';
import { ProductService } from 'src/app/services/apis/product.service';
import { CartService } from 'src/app/services/apis/cart.service';
import { ProductVariantService } from 'src/app/services/apis/productVariant.service';
import { MatRadioModule } from '@angular/material/radio';
import { Location } from '@angular/common'; // Import Location từ Angular
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule, // ✅ fix matInput lỗi
    MatRadioModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: any = {};
  selectedSize: string = '';
  selectedColor: string = '';
  quantity: number = 1;
  isLoading: boolean = true;          // Đặt mặc định là true khi tải
  variants: IProductVariant[] = [];
  uniqueSizes: string[] = [];
  uniqueColors: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private variantService: ProductVariantService,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.params['id'];

    this.productService.getProductById(id).subscribe({
      next: (res) => {
        this.product = res;
        this.getVariantById(id);
      },
      error: (err) => {
        console.error('Error fetching product data:', err);
      },
    });
  }

  getVariantById(productId: number) {
    this.variantService.getVariantById(productId).subscribe({
      next: (res) => {
        if (Array.isArray(res)) {
          this.variants = res;
          // Lọc các size và color duy nhất
          this.uniqueSizes = [...new Set(res.map((v) => v.size))];
          this.uniqueColors = [...new Set(res.map((v) => v.color))];
        } else {
          console.error('Dữ liệu trả về không phải là mảng', res);
          this.variants = [];
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching product variants:', err);
        this.variants = [];
        this.isLoading = false;
      },
    });
  }


  addToCart(variantId: number, quantity: number): void {
    // Kiểm tra xem variantId và quantity có hợp lệ không
    if (!variantId || quantity <= 0) {
      this.snackBar.open('Vui lòng chọn sản phẩm hợp lệ và số lượng đúng!', 'Đóng', { duration: 3000 });
      return;
    }

    // Gọi CartService để thêm sản phẩm vào giỏ hàng
    this.cartService.addToCart(variantId, quantity).subscribe(
      (response) => {
        console.log("Sản phẩm đã được thêm vào giỏ hàng:", response);
        this.snackBar.open('Đã thêm vào giỏ hàng!', 'Đóng', { duration: 3000 });
        // Điều hướng tới trang giỏ hàng sau khi thêm thành công
        this.router.navigate(['/cart']); // Dùng router.navigate để chuyển hướng
      },
      (error) => {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
        this.snackBar.open('Lỗi khi thêm vào giỏ hàng!', 'Đóng', { duration: 3000 });
      }
    );
  }
  handleAddToCart(): void {
    // Tìm variant có kích cỡ và màu sắc đã chọn
    const selectedVariant = this.variants.find(
      (variant) =>
        variant.size?.size_label === this.selectedSize &&
        variant.color?.color_name === this.selectedColor
    );

    // Nếu không tìm thấy variant hợp lệ, thông báo lỗi
    if (!selectedVariant) {
      this.snackBar.open('Vui lòng chọn kích cỡ và màu sắc hợp lệ!', 'Đóng', { duration: 3000 });
      return;
    }
    // Lấy variantId từ variant đã chọn
    const variantId = selectedVariant.id;
    // Kiểm tra xem variantId có hợp lệ không
    if (!variantId) {
      this.snackBar.open('Lỗi: Không có biến thể sản phẩm hợp lệ!', 'Đóng', { duration: 3000 });
      return;
    }
    // Gọi hàm addToCart với variantId và số lượng
    this.addToCart(variantId, this.quantity); // Thêm sản phẩm vào giỏ hàng
  }

}


