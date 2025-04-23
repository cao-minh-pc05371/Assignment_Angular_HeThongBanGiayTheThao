import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { IOrder } from 'src/app/interface/order.interface';

@Component({
  selector: 'app-order-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Chi tiết đơn hàng #{{data.id}}</h2>
    <mat-dialog-content>
      <div class="order-info">
        <p><strong>Khách hàng:</strong> {{data.name}}</p>
        <p><strong>Số điện thoại:</strong> {{data.phone}}</p>
        <p><strong>Địa chỉ:</strong> {{data.address}}</p>
        <p><strong>Ngày đặt:</strong> {{data.order_date | date:'dd/MM/yyyy HH:mm'}}</p>
        <p><strong>Trạng thái:</strong> {{data.status}}</p>
        <p><strong>Ghi chú:</strong> {{data.note || 'Không có'}}</p>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Đóng</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .order-info {
      padding: 16px;
    }
  `]
})
export class OrderDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IOrder
  ) {}
}
