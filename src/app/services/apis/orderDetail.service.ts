import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';
import { Observable, map } from 'rxjs';
import { IOrderDetail } from 'src/app/interface/ordersDetail.interface';
import { ApiService } from '../common/api.service';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailService extends ApiService {
  constructor(private _http: HttpClient) {
    super(_http);
  }

  getAllOrderDetails(): Observable<IOrderDetail[]> {
    return this.get<IOrderDetail[]>(`${API_ENDPOINT.orderDetail.base}${API_ENDPOINT.orderDetail.list}`);
  }

  getByOrderId(orderId: number): Observable<IOrderDetail[]> {
    return this.get<{ data: IOrderDetail[] }>(
      `${API_ENDPOINT.orderDetail.base}${API_ENDPOINT.orderDetail.getByOrder}/${orderId}`
    ).pipe(map(res => res.data));
  }

  addOrderDetail(payload: {
    order_id: number;
    variant_id: number;
    quantity: number;
    price: number;
  }): Observable<any> {
    return this.post(`${API_ENDPOINT.orderDetail.base}${API_ENDPOINT.orderDetail.add}`, payload);
  }

  updateOrderDetail(id: number, data: Partial<IOrderDetail>): Observable<any> {
    return this.put(`${API_ENDPOINT.orderDetail.base}/${id}`, data);
  }

  deleteOrderDetail(id: number): Observable<any> {
    return this.delete(`${API_ENDPOINT.orderDetail.base}/${id}`);
  }
}
