import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/interface/orders.interface';
import { OrderService } from 'src/app/services/apis/order.service';

@Component({
  selector: 'app-orders',
  imports: [MatCardModule, CommonModule, MatIconModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  orders: IOrder[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getAllOrder().subscribe({
      next: (res: any) => {
        this.orders = res?.data ?? res;
        console.log('Orders:', this.orders);
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      }
    });
  }

  getOrderStatusClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'badge bg-warning text-dark'; // Đang chờ xử lý
      case 'shipped':
        return 'badge bg-info text-white';   // Đã giao hàng
      case 'delivered':
        return 'badge bg-success text-white'; // Đã giao thành công
      case 'canceled':
        return 'badge bg-danger text-white';  // Đã hủy
      default:
        return 'badge bg-secondary';          // Không xác định
    }
  }

  getOrderStatusText(status: string): string {
    switch (status) {
      case 'pending':
        return 'Đang xử lý';
      case 'shipped':
        return 'Đã gửi hàng';
      case 'delivered':
        return 'Đã giao';
      case 'canceled':
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  }


  viewOrderDetail(orderId: number): void {
    this.router.navigate(['/admin/orders', orderId]);
  }
}

