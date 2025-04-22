import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICheckout } from 'src/app/interface/checkout.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) { }

  // Tạo đơn hàng mới
  createOrder(orderData: ICheckout): Observable<any> {
    return this.http.post(`${this.apiUrl}`, orderData);
  }

  // Lấy danh sách đơn hàng của người dùng
  getUserOrders(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  // Lấy chi tiết đơn hàng
  getOrderDetails(orderId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${orderId}`);
  }

  // Cập nhật trạng thái đơn hàng
  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${orderId}/status`, { status });
  }
} 