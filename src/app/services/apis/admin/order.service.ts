import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrder } from 'src/app/interface/order.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {
  // Đây là URL cơ sở để gọi API liên quan đến quản lý đơn hàng
  // - http://localhost:8080: địa chỉ máy chủ local
  // - /api: prefix cho các API
  // - /admin: prefix cho các API của admin
  // - /orders: endpoint quản lý đơn hàng
  private apiUrl = 'http://localhost:8080/api/admin/orders';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<{ data: IOrder[] }> {
    return this.http.get<{ data: IOrder[] }>(this.apiUrl);
  }

  updateOrderStatus(orderId: string, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${orderId}/status`, { status });
  }

  getOrderDetails(orderId: string): Observable<IOrder> {
    return this.http.get<IOrder>(`${this.apiUrl}/${orderId}`);
  }
}
