import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';
import { Observable, map } from 'rxjs';
import { IVariant } from 'src/app/interface/variant.interface';

@Injectable({
    providedIn: 'root'
})
export class VariantService extends ApiService {

    constructor
        (
            private _http: HttpClient,
        ) {
        super(_http);
    }

    getAllVariant(): Observable<IVariant[]> {
        return this.get<IVariant[]>(`${API_ENDPOINT.variant.base}${API_ENDPOINT.variant.list}`);
    }

    getVariantById(id: number): Observable<IVariant> {
        return this.get<{ data: IVariant }>(`${API_ENDPOINT.variant.base}/${id}`).pipe(map(res => res.data));
    }

    getVariantByProduct(productId: number): Observable<IVariant[]> {
        const url = `${API_ENDPOINT.variant.base}${API_ENDPOINT.variant.listVariantByIdProduct}/${productId}`;
        return this.get<{ message: string; data: IVariant[] }>(url).pipe(
            map(res => res.data)
        );
    }

    addVariant(data: IVariant): Observable<IVariant> {
        return this.post(`${API_ENDPOINT.variant.base}${API_ENDPOINT.variant.add}`, data);
    }

    updateVariant(id: number, data: IVariant): Observable<IVariant> {
        return this.put<IVariant>(`${API_ENDPOINT.variant.base}/${id}`, data);
    }

    deleteVariant(id: number): Observable<any> {
        return this.delete(`${API_ENDPOINT.variant.base}/${id}`);
    }

}