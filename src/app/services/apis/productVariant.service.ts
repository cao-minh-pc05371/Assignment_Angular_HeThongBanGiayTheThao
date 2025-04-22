import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';
import { IProductVariant } from 'src/app/interface/productvariant.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductVariantService {

  constructor(private http: HttpClient) { }

  // Lấy tất cả biến thể sản phẩm
  getAllVariants(): Observable<IProductVariant[]> {
    return this.http.get<IProductVariant[]>(`${API_ENDPOINT.productVariant.base}${API_ENDPOINT.productVariant.list}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Lấy biến thể sản phẩm theo ID
  getVariantById(id: number): Observable<IProductVariant> {
    return this.http.get<{ data: IProductVariant }>(`${API_ENDPOINT.productVariant.base}/${id}`)
      .pipe(
        map(res => res.data),
        catchError(this.handleError)
      );
  }

  // Lấy tất cả biến thể của một sản phẩm
  getVariantsByProduct(productId: number): Observable<IProductVariant[]> {
    return this.http.get<IProductVariant[]>(`${API_ENDPOINT.productVariant.base}/product/${productId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Thêm mới biến thể
  addVariant(data: IProductVariant): Observable<IProductVariant> {
    return this.http.post<IProductVariant>(`${API_ENDPOINT.productVariant.base}${API_ENDPOINT.productVariant.add}`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Cập nhật biến thể
  updateVariant(id: number, data: IProductVariant): Observable<IProductVariant> {
    return this.http.put<IProductVariant>(`${API_ENDPOINT.productVariant.base}/${id}`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Xóa biến thể
  deleteVariant(id: number): Observable<any> {
    return this.http.delete(`${API_ENDPOINT.productVariant.base}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Xử lý lỗi chung cho các request
  private handleError(error: any): Observable<never> {
    console.error('Có lỗi xảy ra: ', error);
    throw error; // Bạn có thể tùy chỉnh để hiển thị lỗi người dùng thân thiện hơn
  }
}
