import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';
import { Observable, map } from 'rxjs';
import { ICategories } from 'src/app/interface/categories.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends ApiService {
  constructor(private _http: HttpClient) {
    super(_http);
  }

  getCategories(): Observable<ICategories[]> {
    return this.get<any>(
      API_ENDPOINT.category.base + API_ENDPOINT.category.list
    ).pipe(
      map((response) => {
        // Đảm bảo dữ liệu trả về là mảng
        if (Array.isArray(response)) {
          return response;
        } else if (response && response.data && Array.isArray(response.data)) {
          return response.data;
        } else {
          console.error('Dữ liệu danh mục không phải là mảng:', response);
          return []; // Trả về mảng rỗng nếu dữ liệu không đúng định dạng
        }
      })
    );
  }

  getCategoryById(id: number): Observable<ICategories> {
    return this.get<{ status: number; data: ICategories }>(
      API_ENDPOINT.category.base + '/' + id
    ).pipe(map((response) => response.data));
  }

  addCategory(data: ICategories): Observable<ICategories> {
    return this.post<ICategories>(
      API_ENDPOINT.category.base + API_ENDPOINT.category.add,
      data
    );
  }

  editCategory(id: number, data: ICategories): Observable<ICategories> {
    return this.put<ICategories>(API_ENDPOINT.category.base + '/' + id, data);
  }

  deleteCategory(id: number) {
    return this.delete(API_ENDPOINT.category.base + '/' + id);
  }
}
