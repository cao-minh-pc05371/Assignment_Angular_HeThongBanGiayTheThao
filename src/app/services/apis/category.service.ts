import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';
import { Observable, map } from 'rxjs';
import { ICategories } from 'src/app/interface/categories.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ApiService {

  constructor(private _http: HttpClient) {
    super(_http);
  }

  getAllCategories(): Observable<{ status: number, message: string, data: ICategories[] }> {
    return this.get<{ status: number, message: string, data: ICategories[] }>(`${API_ENDPOINT.category.base}${API_ENDPOINT.category.list}`);
  }

  getCategoryById(id: number): Observable<ICategories> {
    return this.get<{ data: ICategories }>(`${API_ENDPOINT.category.base}/${id}`).pipe(map(res => res.data));
  }

  addCategory(data: ICategories): Observable<ICategories> {
    return this.post<ICategories>(`${API_ENDPOINT.category.base}${API_ENDPOINT.category.add}`, data);
  }

  updateCategory(id: number, data: ICategories): Observable<ICategories> {
    return this.put<ICategories>(`${API_ENDPOINT.category.base}/${id}`, data);
  }

  deleteCategory(id: number): Observable<any> {
    return this.delete(`${API_ENDPOINT.category.base}/${id}`);
  }

}
