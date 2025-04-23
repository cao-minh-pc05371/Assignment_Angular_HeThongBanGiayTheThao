import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { CartService } from 'src/app/services/apis/cart.service';

import { OrderService } from 'src/app/services/apis/order.service';
import { ICartItem } from 'src/app/interface/cart.interface';
import { ICheckout } from 'src/app/interface/checkout.interface';
import { IOrder } from 'src/app/interface/order.interface';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cartItems: ICartItem[] = [];
  isLoading = false;
  isProcessing = false;
  checkoutForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCart();
  }

  initForm(): void {
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      note: [''],
    });
  }

  loadCart(): void {
    this.isLoading = true;
    this.cartService.getCartItems().subscribe({
      next: (data) => {
        this.cartItems = data;
        if (this.cartItems.length === 0) {
          this.showMessage('Giỏ hàng trống, không thể tiến hành thanh toán');
          this.router.navigate(['/cart']);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Lỗi khi tải giỏ hàng:', error);
        this.isLoading = false;
        this.showMessage('Không thể tải giỏ hàng. Vui lòng thử lại sau.');
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
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  placeOrder(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      this.showMessage('Vui lòng điền đầy đủ thông tin hợp lệ');
      return;
    }

    this.isProcessing = true;
    const orderData: ICheckout = {
      user_id: this.cartItems[0].user_id, // Lấy từ user đang đăng nhập
      name: this.checkoutForm.value.name,
      phone: this.checkoutForm.value.phone,
      address: this.checkoutForm.value.address,
      note: this.checkoutForm.value.note,
      items: this.cartItems.map(item => ({
        variant_id: item.product_variant?.id || 0,
        quantity: item.quantity,
        price: item.product_variant?.product?.price || 0
      }))
    };

    this.orderService.createOrder(orderData).subscribe({
      next: (response: { message: string; order: IOrder }) => {
        this.isProcessing = false;
        this.showMessage('Đặt hàng thành công!');
        this.router.navigate(['/']);
      },
      error: (error: Error) => {
        console.error('Lỗi khi đặt hàng:', error);
        this.isProcessing = false;
        this.showMessage('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.');
      }
    });
  }

  onNavigateToCart() {
    console.log('Navigating to /cart');
  }

  showMessage(message: string): void {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  // Helpers for form validation
  get f() {
    return this.checkoutForm.controls;
  }
}
