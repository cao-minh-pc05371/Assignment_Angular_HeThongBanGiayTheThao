import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IOrder } from 'src/app/interface/orders.interface';
import { OrderService } from 'src/app/services/apis/order.service';
import { OrderDetailListComponent } from "../order-detail-list/order-detail-list.component";

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [MatCardModule, CommonModule, OrderDetailListComponent],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent {
  orderId!: number;
  order!: IOrder;
  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.orderId) {
      this.getOrderDetail();
    } else {
      this.errorMessage = 'Không tìm thấy mã đơn hàng';
    }
  }

  getOrderDetail(): void {
    this.loading = true;
    this.orderService.getOrderByID(this.orderId).subscribe({
      next: (res) => {
        this.order = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Lỗi khi lấy chi tiết đơn hàng:', err);
        this.errorMessage = 'Không thể tải chi tiết đơn hàng';
        this.loading = false;
      }
    });
  }

  getOrderStatusClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'badge bg-warning text-dark';
      case 'shipped':
        return 'badge bg-info text-white';
      case 'delivered':
        return 'badge bg-success text-white';
      case 'canceled':
        return 'badge bg-danger text-white';
      default:
        return 'badge bg-secondary';
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

  openStatusUpdateDialog() {
    if (!this.orderId) return;

    this.orderService.markAsShipped(this.orderId).subscribe({
      next: (res) => {
        this.order.status = 'shipped';
        alert(res.message || 'Đơn hàng đã được đánh dấu là đã chuẩn bị');
      },
      error: (err) => {
        console.error('Lỗi khi cập nhật trạng thái đơn hàng:', err);
        alert(err.error?.message || 'Không thể cập nhật trạng thái đơn hàng');
      }
    });
  }

}