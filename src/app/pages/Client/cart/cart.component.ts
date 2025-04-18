<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { Component } from '@angular/core';
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< HEAD
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
=======
@Component({
  selector: 'app-cart',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CartComponent {


  constructor(
    private router: Router
  ) { }


  products = [
    { "productId": 1, name: 'Giày Nike Air Max 270', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlrsEd96yuOwXUmHH7Aps6CzY69qCmXGnDxw&s', price: 1000000, quantity: 1 },
    { "productId": 2, name: 'Giày Adidas Ultraboost 21', image: 'https://png.pngtree.com/png-vector/20201128/ourlarge/pngtree-casual-shoes-png-image_2394294.jpg', price: 1200000, quantity: 3 },
    { "productId": 3, name: 'Giày Puma RS-X3', image: 'https://product.hstatic.net/200000142885/product/z4121570251442_1ea4dad0962c57799e2306bf9b6cfe76_90c1420390b94518b2c2b45936bfbb88_master.jpg', price: 1500000, quantity: 5 },
  ];


  increaseQuantity(product: any) {
    product.quantity += 1;
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity -= 1;
    }
  }


  getTotalPrice(): number {
    return this.products.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }
  

>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
}
