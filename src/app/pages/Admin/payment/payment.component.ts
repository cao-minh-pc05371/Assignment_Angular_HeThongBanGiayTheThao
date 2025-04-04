import { Component } from '@angular/core';
import { IPayment } from 'src/app/interface/payment.interface';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  imports: [MatCardModule, CommonModule, MatIcon],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  payments: IPayment[] = [
    {
      id: 1,
      orderId: 101,
      codePayment: 'PM001',
      statusPayment: 'Đang xử lý',
      total_price: 100000,
      paymentMethod: 'Thanh toán online'
    },
    {
      id: 2,
      orderId: 102,
      codePayment: 'PM002',
      statusPayment: 'Đã thanh toán',
      total_price: 200000,
      paymentMethod: 'Thanh toán online',
      paymentDate: '2024-03-23T10:30:00Z',
      transactionId: 'TRANS12345'
    },
    {
      id: 3,
      orderId: 103,
      codePayment: 'PM003',
      statusPayment: 'Đang xử lý',
      total_price: 300000,
      paymentMethod: 'Thanh toán online'
    },
    {
      id: 4,
      orderId: 104,
      codePayment: 'PM004',
      statusPayment: 'Đã hủy',
      total_price: 400000,
      paymentMethod: 'Thanh toán online',
      notes: 'Khách yêu cầu hủy'
    },
    {
      id: 5,
      orderId: 105,
      codePayment: 'PM005',
      statusPayment: 'Đã thanh toán',
      total_price: 500000,
      paymentMethod: 'Thanh toán online',
      paymentDate: '2024-03-22T15:00:00Z',
      transactionId: 'TRANS67890'
    }
  ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'Đang xử lý':
        return 'bg-warning';
      case 'Đã thanh toán':
        return 'bg-success';
      case 'Đã hủy':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }


}
