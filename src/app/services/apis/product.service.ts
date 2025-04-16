import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';
import { Observable, map } from 'rxjs';
import { IProduct } from 'src/app/interface/products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends ApiService {
  constructor(private _http: HttpClient) {
    super(_http);
  }

  getProducts(): Observable<IProduct[]> {
    return this.get<any>(
      API_ENDPOINT.product.base + API_ENDPOINT.product.list
    ).pipe(
      map((response) => {
        // Đảm bảo dữ liệu trả về là mảng
        if (Array.isArray(response)) {
          return response;
        } else if (response && response.data && Array.isArray(response.data)) {
          return response.data;
        } else {
          console.error('Dữ liệu sản phẩm không phải là mảng:', response);
          return []; // Trả về mảng rỗng nếu dữ liệu không đúng định dạng
        }
      })
    );
  }

  getProductById(id: number): Observable<IProduct> {
    return this.get<{ status: number; data: IProduct }>(
      API_ENDPOINT.product.base + '/' + id
    ).pipe(map((response) => response.data));
  }

  addProduct(data: IProduct): Observable<IProduct> {
    return this.post(
      `${API_ENDPOINT.product.base}${API_ENDPOINT.product.add}`,
      data
    );
  }

  editProduct(id: number, data: IProduct): Observable<IProduct> {
    return this.put<IProduct>(API_ENDPOINT.product.base + '/' + id, data);
  }

  deleteProduct(id: number) {
    return this.delete(API_ENDPOINT.product.base + '/' + id);
  }
}
