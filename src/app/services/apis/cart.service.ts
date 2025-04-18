import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService extends ApiService {

  constructor(
    private _http: HttpClient,
  ) {
    super(_http);
  }

  getCartItems(): Observable<any[]> {
    const user = this.decodeToken();
    if (!user || !user.id) {
      return new Observable((subscriber) => subscriber.next([]));
    }
    return this.get<any>(`${API_ENDPOINT.cart.base}/user/${user.id}`).pipe(
      map((response) => response.data || [])
    );
  }

  addToCart(variant_id: number, quantity: number): Observable<any> {
    const user = this.decodeToken();
    return this.post(`${API_ENDPOINT.cart.base}/add`, {
      user_id: user.id,
      variant_id,
      quantity,
    });
  }

  updateCartItem(id: number, quantity: number): Observable<any> {
    return this.put(`${API_ENDPOINT.cart.base}/${id}`, { quantity });
  }

  removeFromCart(id: number): Observable<any> {
    return this.delete(`${API_ENDPOINT.cart.base}/${id}`);
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
