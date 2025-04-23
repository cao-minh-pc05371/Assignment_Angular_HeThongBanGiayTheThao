import { Component, OnInit } from '@angular/core';
import { IPayment } from 'src/app/interface/payment.interface';
import { PaymentService } from 'src/app/services/apis/payment.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  payments: IPayment[] = [];
  loading = false;
  errorMessage = '';

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.loading = true;
    this.paymentService.getAllPayment().subscribe({
      next: (res) => {
        this.payments = res.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách thanh toán:', err);
        this.errorMessage = 'Không thể tải danh sách thanh toán';
        this.loading = false;
      }
    });
  }

  getPaymentStatusClass(status: string): string {
    switch (status) {
      case 'pending': return 'badge bg-warning text-dark';
      case 'completed': return 'badge bg-success text-white';
      case 'failed': return 'badge bg-danger text-white';
      default: return 'badge';
    }
  }

  getPaymentStatusText(status: string): string {
    switch (status) {
      case 'pending': return 'Chờ xác nhận';
      case 'completed': return 'Đã thanh toán';
      case 'failed': return 'Thất bại';
      default: return 'Không xác định';
    }
  }

  formatDateTime(dateStr: string): string {
    return formatDate(dateStr, 'dd/MM/yyyy HH:mm', 'en-US');
  }

  viewDetail(payment: IPayment): void {
    console.log('Chi tiết thanh toán:', payment);
  }
}