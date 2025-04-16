import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/apis/cart.service';
import { ICartItem } from 'src/app/interface/cart.interface';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CartComponent implements OnInit {
  cartItems: ICartItem[] = [];
  isLoading = false;

  constructor(
    private router: Router,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.isLoading = true;
    this.cartService.getCartItems().subscribe({
      next: (data) => {
        this.cartItems = data;
        console.log('Cart data:', data); // For debugging
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Lỗi khi tải giỏ hàng:', error);
        this.isLoading = false;
        this.showMessage('Không thể tải giỏ hàng. Vui lòng thử lại sau.');
      },
    });
  }

  increaseQuantity(item: ICartItem): void {
    this.isLoading = true;
    this.cartService.updateCartItem(item.id, item.quantity + 1).subscribe({
      next: () => {
        item.quantity += 1;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Lỗi khi cập nhật giỏ hàng:', error);
        this.isLoading = false;
        this.showMessage('Không thể cập nhật giỏ hàng. Vui lòng thử lại sau.');
      },
    });
  }

  decreaseQuantity(item: ICartItem): void {
    if (item.quantity > 1) {
      this.isLoading = true;
      this.cartService.updateCartItem(item.id, item.quantity - 1).subscribe({
        next: () => {
          item.quantity -= 1;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Lỗi khi cập nhật giỏ hàng:', error);
          this.isLoading = false;
          this.showMessage(
            'Không thể cập nhật giỏ hàng. Vui lòng thử lại sau.'
          );
        },
      });
    }
  }

  removeItem(id: number): void {
    this.isLoading = true;
    this.cartService.removeFromCart(id).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter((item) => item.id !== id);
        this.isLoading = false;
        this.showMessage('Đã xóa sản phẩm khỏi giỏ hàng');
      },
      error: (error) => {
        console.error('Lỗi khi xóa sản phẩm:', error);
        this.isLoading = false;
        this.showMessage('Không thể xóa sản phẩm. Vui lòng thử lại sau.');
      },
    });
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      return (
        total + (item.product_variant?.product?.price || 0) * item.quantity
      );
    }, 0);
  }

  getTotalItems(): number {
    return this.cartItems.length;
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
