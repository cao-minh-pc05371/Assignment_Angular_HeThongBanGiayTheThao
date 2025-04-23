import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { IOrderClient } from 'src/app/interface/order.interface.client';



@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:3000'; // Cập nhật URL API của bạn tại đây

  constructor(private http: HttpClient) {}

  // Admin: Lấy danh sách tất cả đơn hàng
  getAllOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/order/list`);
  }

  getOrdersByUser(userId: string): Observable<IOrderClient[]> {
    const token = localStorage.getItem('token'); // hoặc từ AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<IOrderClient[]>(`${this.apiUrl}/order/user/${userId}`, { headers }).pipe(
      catchError((error) => {
        console.error('Lỗi khi lấy đơn hàng:', error);
        return throwError(() => new Error('Không thể tải dữ liệu'));
      })
    );
  }

  // Lấy chi tiết đơn hàng theo ID
  getOrderById(orderId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/order/${orderId}`);
  }

  // Người dùng: Tạo đơn hàng mới
  createOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/order/add`, orderData);
  }

  // Admin: Cập nhật trạng thái đơn hàng
  updateOrder(orderId: string, updateData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/order/${orderId}`, updateData);
  }

  // Admin: Xóa đơn hàng
  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/order/${orderId}`);
  }

  // Hủy đơn hàng
  cancelOrder(orderId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/orders/${orderId}/cancel`, {});
  }
}
