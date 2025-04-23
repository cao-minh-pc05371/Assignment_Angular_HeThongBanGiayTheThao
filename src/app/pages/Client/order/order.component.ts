import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { jwtDecode } from 'jwt-decode'; // Thêm dòng này
import { IOrder } from 'src/app/interface/orders.interface';
import { OrderService } from 'src/app/services/apis/order.servies';
import { IOrderClient } from 'src/app/interface/order.interface.client';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders: IOrderClient[] = [];
  errorMessage: string = '';
  userId: string | null = null;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.initializeUserData();
  }

  // Hàm xử lý token
  private initializeUserData(): void {
    const token = localStorage.getItem('token');

    console.log('Token:', token);

    if (!token) {
      this.errorMessage = 'Bạn chưa đăng nhập!';
      return;
    }

    try {
      // Sử dụng thư viện jwt-decode
      const decoded: any = jwtDecode(token);
      this.userId = decoded.id || decoded.userId || decoded.sub;

      if (!this.userId) {
        this.errorMessage = 'Không tìm thấy thông tin người dùng';
        return;
      }

      this.loadOrdersByUser(this.userId);
    } catch (error) {
      console.error('Lỗi giải mã token:', error);
      this.errorMessage = 'Token không hợp lệ!';
    }
  }
  loadOrdersByUser(userId: string): void {
    this.orderService.getOrdersByUser(userId).subscribe({
      next: (res: IOrderClient[]) => {
        this.orders = res; // Đảm bảo dữ liệu được gán vào biến orders
        console.log('Dữ liệu nhận được:', this.orders); // Kiểm tra trong console
      },
      error: (err: any) => {
        console.error('Lỗi:', err);
      }
    });
  }

  cancelOrder(orderId: number | string): void {
    if (confirm("Bạn có chắc muốn hủy đơn hàng này?")) {
      this.orderService.cancelOrder(orderId.toString()).subscribe({
        next: () => {
          alert("Hủy đơn hàng thành công!");
          if (this.userId) {
            this.loadOrdersByUser(this.userId);
          }
        },
        error: (err) => {
          console.error("Lỗi hủy đơn hàng:", err);
          alert(err?.error?.message || "Không thể hủy đơn hàng");
        }
      });
    }
  }
  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'pending': 'Đang xử lý',

      'shipped': 'Đang vận chuyển',
      'delivered': 'Đã giao hàng',
      'cancelled': 'Đã hủy',
      'returned': 'Đã trả hàng'
    };
    return statusMap[status] || status;
  }
}
