import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';
import { Observable, map } from 'rxjs';
import { IBrands } from 'src/app/interface/brands.interface';

@Injectable({
    providedIn: 'root'
})
export class BrandService extends ApiService {

    constructor
        (
            private _http: HttpClient,
        ) {
        super(_http);
    }

    getAllBrands(): Observable<IBrands[]> {
        return this.get<IBrands[]>(`${API_ENDPOINT.brand.base}${API_ENDPOINT.brand.list}`);
    }

    getBrandById(id: number): Observable<IBrands> {
        return this.get<{ data: IBrands }>(`${API_ENDPOINT.brand.base}/${id}`).pipe(map(res => res.data));
    }

    addBrand(formData: FormData): Observable<IBrands> {
        return this.post(`${API_ENDPOINT.brand.base}${API_ENDPOINT.brand.add}`, formData);
    }

    updateBrand(id: number, data: IBrands): Observable<IBrands> {
        return this.put<IBrands>(`${API_ENDPOINT.brand.base}/${id}`, data);
    }

    deleteBrand(id: number): Observable<any> {
        return this.delete(`${API_ENDPOINT.brand.base}/${id}`);
    }

}