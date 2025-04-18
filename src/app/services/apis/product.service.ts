import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';
import { Observable, map } from 'rxjs';
import { IProduct } from 'src/app/interface/products.interface';

@Injectable({
<<<<<<< HEAD
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
=======
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
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
