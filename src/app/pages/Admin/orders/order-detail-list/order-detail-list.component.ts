import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { OrderDetailService } from 'src/app/services/apis/orderDetail.service';
import { IOrderDetail } from 'src/app/interface/ordersDetail.interface';

@Component({
  selector: 'app-order-detail-list',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './order-detail-list.component.html',
  styleUrl: './order-detail-list.component.scss'
})
export class OrderDetailListComponent implements OnChanges {
  @Input() orderId!: number;
  orderDetails: IOrderDetail[] = [];
  loading = false;
  errorMessage = '';
  totalAmount: number = 0;

  constructor(private orderDetailService: OrderDetailService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orderId'] && this.orderId) {
      this.loadOrderDetails();
    }
  }

  loadOrderDetails(): void {
    this.loading = true;
    this.orderDetailService.getByOrderId(this.orderId).subscribe({
      next: (res) => {
        this.orderDetails = res;
        this.totalAmount = this.orderDetails.reduce((sum, item) => {
          return sum + (item.price * item.quantity);
        }, 0);
      },
      error: (err) => {
        this.errorMessage = 'Không thể tải danh sách chi tiết đơn hàng';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
