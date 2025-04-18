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

  // Lấy tất cả sản phẩm
  getAllProducts(): Observable<IProduct[]> {
    return this.get<{ data: IProduct[] }>(
      `${API_ENDPOINT.product.base}${API_ENDPOINT.product.list}`
    ).pipe(map(res => res.data));
  }

  // Lấy sản phẩm theo ID
  getProductById(id: number): Observable<IProduct> {
    return this.get<{ data: IProduct }>(
      `${API_ENDPOINT.product.base}/${id}`
    ).pipe(map(res => res.data));
  }

  // Thêm sản phẩm mới
  addProduct(formData: IProduct): Observable<IProduct> {
    return this.post(
      `${API_ENDPOINT.product.base}${API_ENDPOINT.product.add}`,
      formData
    );
  }

  // Cập nhật sản phẩm
  updateProduct(id: number, data: IProduct): Observable<IProduct> {
    return this.put<IProduct>(
      `${API_ENDPOINT.product.base}/${id}`,
      data
    );
  }

  // Xóa sản phẩm
  deleteProduct(id: number): Observable<any> {
    return this.delete(`${API_ENDPOINT.product.base}/${id}`);
  }
}
