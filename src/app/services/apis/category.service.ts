import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';
import { Observable, map } from 'rxjs';
import { ICategories } from 'src/app/interface/categories.interface';

@Injectable({
<<<<<<< HEAD
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
=======
    providedIn: 'root'
})
export class CategoryService extends ApiService {

    constructor
        (
            private _http: HttpClient,
        ) {
        super(_http);
    }

    getCategories(): Observable<ICategories[]> {
        return this.get<ICategories[]>(API_ENDPOINT.category.base + API_ENDPOINT.category.list);
    
      }
    
      getCategoryById(id: number): Observable<ICategories> {
        return this.get<{ status: number, data: ICategories }>(API_ENDPOINT.category.base + '/' + id).pipe(map(response => response.data));
      }
    
      addCategory(data: ICategories): Observable<ICategories> {
        return this.post<ICategories>(API_ENDPOINT.category.base + API_ENDPOINT.category.add, data);
      }
    
      editCategory(id: number, data: ICategories): Observable<ICategories> {
        return this.put<ICategories>(API_ENDPOINT.category.base + '/' + id, data);
      }
    
      deleteCategory(id: number) {
        return this.delete(API_ENDPOINT.category.base + '/' + id);
      }
}
>>>>>>> 93c2efa712e8f62f9ec5b8c6517e0ef559e4a36a
