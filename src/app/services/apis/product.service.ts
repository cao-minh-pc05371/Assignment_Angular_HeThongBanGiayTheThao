import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';
import { Observable, map } from 'rxjs';
import { IProduct } from 'src/app/interface/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ApiService {

  constructor
    (
      private _http: HttpClient,
    ) {
    super(_http);
  }

  getProducts(): Observable<IProduct[]> {
    return this.get<IProduct[]>(API_ENDPOINT.product.base + API_ENDPOINT.product.list);

  }

  getProductById(id: number): Observable<IProduct> {
    return this.get<{ status: number, data: IProduct }>(API_ENDPOINT.product.base + '/' + id).pipe(map(response => response.data));
  }

  addProduct(data: FormData): Observable<any> {
    return this.post(`${API_ENDPOINT.product.base}${API_ENDPOINT.product.add}`, data);
  }

  editProduct(id: number, data: IProduct): Observable<IProduct> {
    return this.put<IProduct>(API_ENDPOINT.product.base + '/' + id, data);
  }

  deleteProduct(id: number) {
    return this.delete(API_ENDPOINT.product.base + '/' + id);
  }
}