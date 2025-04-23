import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
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
    MatRadioModule,
    MatIconModule,
    MatDividerModule,
    MatStepperModule,
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

  // Các phương thức thanh toán
  paymentMethods = [
    {
      value: 'cod',
      label: 'Thanh toán khi nhận hàng (COD)',
      icon: 'local_shipping',
    },
    {
      value: 'bank_transfer',
      label: 'Chuyển khoản ngân hàng',
      icon: 'account_balance',
    },
    { value: 'momo', label: 'Ví điện tử MoMo', icon: 'account_balance_wallet' },
    { value: 'vnpay', label: 'VNPay', icon: 'credit_card' },
  ];

  // Danh sách các tỉnh/thành phố (Đây là danh sách mẫu, bạn có thể thay thế bằng API thực tế)
  cities = [
    'Hà Nội',
    'Hồ Chí Minh',
    'Đà Nẵng',
    'Hải Phòng',
    'Cần Thơ',
    'An Giang',
    'Bà Rịa - Vũng Tàu',
    'Bắc Giang',
    'Bắc Kạn',
    'Bạc Liêu',
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCart();
  }

  initForm(): void {
    this.checkoutForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      ward: ['', Validators.required],
      paymentMethod: ['cod', Validators.required],
      notes: [''],
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
    const orderData = {
      ...this.checkoutForm.value,
      items: this.cartItems,
      total: this.getTotalPrice(),
    };

    // Đây là nơi bạn sẽ gọi API để tạo đơn hàng
    // Giả lập đặt hàng thành công sau 2 giây
    setTimeout(() => {
      console.log('Đã đặt hàng với dữ liệu:', orderData);
      this.isProcessing = false;
      this.showMessage('Đặt hàng thành công!');
      this.router.navigate(['/order-success']);
    }, 2000);
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
