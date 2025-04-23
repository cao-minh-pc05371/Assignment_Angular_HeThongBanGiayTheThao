import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';
import { Observable, map } from 'rxjs';
import { IPayment } from 'src/app/interface/payment.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends ApiService {

  constructor(private _http: HttpClient) {
    super(_http);
  }

  getAllPayment(): Observable<{ status: number, message: string, data: IPayment[] }> {
    return this.get<{ status: number, message: string, data: IPayment[] }>(
      `${API_ENDPOINT.payment.base}${API_ENDPOINT.payment.list}`
    );
  }

  getPaymentByOrderId(order_id: number): Observable<IPayment> {
    return this.get<{ data: IPayment }>(
      `${API_ENDPOINT.payment.base}${API_ENDPOINT.payment.getByOrder}/${order_id}`
    ).pipe(map(res => res.data));
  }

  addPayment(data: IPayment): Observable<IPayment> {
    return this.post<IPayment>(`${API_ENDPOINT.payment.base}${API_ENDPOINT.payment.add}`, data);
  }

  updatePayment(id: number, data: IPayment): Observable<IPayment> {
    return this.put<IPayment>(`${API_ENDPOINT.payment.base}/${id}`, data);
  }

  deletePayment(id: number): Observable<any> {
    return this.delete(`${API_ENDPOINT.payment.base}/${id}`);
  }
}

