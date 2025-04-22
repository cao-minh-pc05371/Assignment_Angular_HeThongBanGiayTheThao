import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../common/api.service';
import { Observable, map } from 'rxjs';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';

@Injectable({
  providedIn: 'root',
})
export class CartService extends ApiService {
  constructor(private _http: HttpClient) {
    super(_http);
  }

  // Lấy giỏ hàng của user hiện tại
  getCartItems(): Observable<any[]> {
    const user = this.decodeToken();
    if (!user || !user.id) {
      return new Observable((subscriber) => subscriber.next([]));
    }
    return this.get<any>(`${API_ENDPOINT.cart.base}/user/${user.id}`).pipe(
      map((response) => response.data || [])
    );
  }

  // Hàm thêm sản phẩm vào giỏ hàng
  addToCart(variant_id: number, quantity: number): Observable<any> {
    const user = this.decodeToken(); // Giải mã token và lấy thông tin người dùng
    if (!user) {
      return new Observable(observer => {
        observer.error('Token không hợp lệ hoặc hết hạn');
      });
    }

    const token = this.getToken();   // Lấy token từ localStorage

    return this._http.post<any>(`${API_ENDPOINT.cart.base}/add`, {user_id: user.id, variant_id, quantity }, {
      headers: {
        Authorization: `Bearer ${token}` // Gửi token trong header
      }
    });
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateCartItem(id: number, quantity: number): Observable<any> {
    return this.put(`${API_ENDPOINT.cart.base}/${id}`, { quantity });
  }

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart(id: number): Observable<any> {
    return this.delete(`${API_ENDPOINT.cart.base}/${id}`);
  }

  // Decode token để lấy thông tin user
  private decodeToken(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      return null;
    }
  }
}
