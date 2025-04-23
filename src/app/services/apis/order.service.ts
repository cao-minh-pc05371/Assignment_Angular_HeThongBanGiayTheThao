import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';
import { Observable, map } from 'rxjs';
import { IOrder } from 'src/app/interface/orders.interface';


@Injectable({
  providedIn: 'root',
})
export class OrderService extends ApiService {

  constructor(
    private _http: HttpClient,
  ) {
    super(_http);
  }

  getAllOrder(): Observable<IOrder[]> {
    return this.get<IOrder[]>(`${API_ENDPOINT.order.base}${API_ENDPOINT.order.list}`);
  }

  getOrderByID(id: number): Observable<IOrder> {
    return this.get<{ data: IOrder }>(`${API_ENDPOINT.order.base}/${id}`).pipe(map(res => res.data));
  }

  getOrderItems(): Observable<any[]> {
    const user = this.decodeToken();
    if (!user || !user.id) {
      return new Observable((subscriber) => subscriber.next([]));
    }
    return this.get<any>(`${API_ENDPOINT.order.base}/user/${user.id}`).pipe(
      map((response) => response.data || [])
    );
  }

  addToOrder(variant_id: number, quantity: number): Observable<any> {
    const user = this.decodeToken();
    return this.post(`${API_ENDPOINT.order.base}/add`, {
      user_id: user.id,
      variant_id,
      quantity,
    });
  }

  updateOrderItem(id: number, quantity: number): Observable<any> {
    return this.put(`${API_ENDPOINT.order.base}/${id}`, { quantity });
  }

  markAsShipped(orderId: number): Observable<any> {
    return this.patch(
      `${API_ENDPOINT.order.base}/${orderId}${API_ENDPOINT.order.mark_shipped}`,
      {}
    );
  }

  removeFromOrder(id: number): Observable<any> {
    return this.delete(`${API_ENDPOINT.order.base}/${id}`);
  }

  // Helper function to decode the token and get user information
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
