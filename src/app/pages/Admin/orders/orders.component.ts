import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AdminOrderService } from 'src/app/services/apis/admin/order.service';
import { IOrder } from 'src/app/interface/order.interface';
import { OrderDetailDialogComponent } from './order-detail-dialog/order-detail-dialog.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="orders-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Quản lý đơn hàng</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <!-- Orders table -->
          <div class="table-container">
            <table mat-table [dataSource]="orders" class="orders-table">
              <!-- ID Column -->
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef>Mã đơn</th>
                <td mat-cell *matCellDef="let order">{{ order.id }}</td>
              </ng-container>

              <!-- Customer Column -->
              <ng-container matColumnDef="customer">
                <th mat-header-cell *matHeaderCellDef>Khách hàng</th>
                <td mat-cell *matCellDef="let order">{{ order.name }}</td>
              </ng-container>

              <!-- Phone Column -->
              <ng-container matColumnDef="phone">
                <th mat-header-cell *matHeaderCellDef>Số điện thoại</th>
                <td mat-cell *matCellDef="let order">{{ order.phone }}</td>
              </ng-container>

              <!-- Date Column -->
              <ng-container matColumnDef="date">
                <th mat-header-cell *matHeaderCellDef>Ngày đặt</th>
                <td mat-cell *matCellDef="let order">{{ order.order_date | date:'dd/MM/yyyy' }}</td>
              </ng-container>

              <!-- Status Column -->
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Trạng thái</th>
                <td mat-cell *matCellDef="let order">
                  <span [class]="'status-badge ' + order.status">
                    {{ getStatusText(order.status) }}
                  </span>
                </td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Thao tác</th>
                <td mat-cell *matCellDef="let order">
                  <button mat-icon-button [matMenuTriggerFor]="menu">
                    <mat-icon>more_vert</mat-icon>
                  </button>
                  <mat-menu #menu="matMenu">
                    <button mat-menu-item (click)="viewOrderDetails(order)">
                      <mat-icon>visibility</mat-icon>
                      <span>Xem chi tiết</span>
                    </button>
                    <button mat-menu-item (click)="updateOrderStatus(order, 'processing')" 
                            *ngIf="order.status === 'pending'">
                      <mat-icon>play_arrow</mat-icon>
                      <span>Xử lý đơn</span>
                    </button>
                    <button mat-menu-item (click)="updateOrderStatus(order, 'shipped')" 
                            *ngIf="order.status === 'processing'">
                      <mat-icon>local_shipping</mat-icon>
                      <span>Giao hàng</span>
                    </button>
                    <button mat-menu-item (click)="updateOrderStatus(order, 'delivered')" 
                            *ngIf="order.status === 'shipped'">
                      <mat-icon>check_circle</mat-icon>
                      <span>Hoàn thành</span>
                    </button>
                    <button mat-menu-item (click)="updateOrderStatus(order, 'cancelled')" 
                            *ngIf="order.status !== 'delivered' && order.status !== 'cancelled'">
                      <mat-icon>cancel</mat-icon>
                      <span>Hủy đơn</span>
                    </button>
                  </mat-menu>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>

            <div class="loading-spinner" *ngIf="isLoading">
              <mat-spinner diameter="40"></mat-spinner>
            </div>

            <div class="no-data" *ngIf="!isLoading && orders.length === 0">
              <p>Không có đơn hàng nào</p>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .orders-container {
      padding: 20px;
    }

    .table-container {
      position: relative;
      min-height: 200px;
      overflow-x: auto;
    }

    .orders-table {
      width: 100%;
    }

    .status-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 500;

      &.pending {
        background-color: #fff3e0;
        color: #e65100;
      }

      &.processing {
        background-color: #e3f2fd;
        color: #1565c0;
      }

      &.shipped {
        background-color: #e8f5e9;
        color: #2e7d32;
      }

      &.delivered {
        background-color: #f1f8e9;
        color: #558b2f;
      }

      &.cancelled {
        background-color: #ffebee;
        color: #c62828;
      }
    }

    .loading-spinner {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
    }

    .no-data {
      text-align: center;
      padding: 2rem;
      color: #666;
    }
  `]
})
export class OrdersComponent implements OnInit {
  orders: IOrder[] = [];
  displayedColumns: string[] = ['id', 'customer', 'phone', 'date', 'status', 'actions'];
  isLoading = false;

  constructor(
    private orderService: AdminOrderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.orderService.getOrders().subscribe({
      next: (response: any) => {
        this.orders = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Lỗi khi tải danh sách đơn hàng:', error);
        this.isLoading = false;
        this.showMessage('Không thể tải danh sách đơn hàng');
      }
    });
  }

  viewOrderDetails(order: IOrder): void {
    this.dialog.open(OrderDetailDialogComponent, {
      width: '800px',
      data: order
    });
  }

  updateOrderStatus(order: IOrder, status: string): void {
    this.orderService.updateOrderStatus(order.id, status).subscribe({
      next: () => {
        this.showMessage('Cập nhật trạng thái thành công');
        this.loadOrders();
      },
      error: (error) => {
        console.error('Lỗi khi cập nhật trạng thái:', error);
        this.showMessage('Không thể cập nhật trạng thái');
      }
    });
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'pending': 'Chờ xử lý',
      'processing': 'Đang xử lý',
      'shipped': 'Đang giao',
      'delivered': 'Đã giao',
      'cancelled': 'Đã hủy'
    };
    return statusMap[status] || status;
  }

  showMessage(message: string): void {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
