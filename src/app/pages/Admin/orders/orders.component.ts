import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IOrder } from 'src/app/interface/orders.interface';

@Component({
  selector: 'app-orders',
  imports: [MatCardModule, CommonModule, MatIconModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  orders: IOrder[] = [
    {
      id: 1,
      orderCode: 'OD001',
      customerName: 'Nguyễn Văn A',
      orderDate: '2025-03-23',
      status: 'Chờ xác nhận',
      totalAmount: 500000,
      paymentMethod: 'Thanh toán online',
      paymentStatus: 'Chưa thanh toán'
    },
    {
      id: 2,
      orderCode: 'OD002',
      customerName: 'Trần Thị B',
      orderDate: '2025-03-22',
      status: 'Đang xử lý',
      totalAmount: 1200000,
      paymentMethod: 'Thanh toán khi nhận hàng',
      paymentStatus: 'Chưa thanh toán'
    },
    {
      id: 3,
      orderCode: 'OD003',
      customerName: 'Lê Hoàng C',
      orderDate: '2025-03-21',
      status: 'Đã giao hàng',
      totalAmount: 250000,
      paymentMethod: 'Thanh toán online',
      paymentStatus: 'Đã thanh toán'
    },
    {
      id: 4,
      orderCode: 'OD004',
      customerName: 'Phạm Hồng D',
      orderDate: '2025-03-20',
      status: 'Đã hủy',
      totalAmount: 750000,
      paymentMethod: 'Thanh toán online',
      paymentStatus: 'Chưa thanh toán'
    }
  ];

  getOrderStatusClass(status: string): string {
    switch (status) {
      case 'Chờ xác nhận':
        return 'status-pending';
      case 'Đang xử lý':
        return 'status-processing';
      case 'Đã giao hàng':
        return 'status-completed';
      case 'Đã hủy':
        return 'status-cancelled';
      default:
        return '';
    }
  }

}
