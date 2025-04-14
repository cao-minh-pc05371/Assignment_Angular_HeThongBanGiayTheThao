import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';
import { Observable, map } from 'rxjs';
import { ISize } from 'src/app/interface/size.interface';

@Injectable({
    providedIn: 'root'
})
export class SizeService extends ApiService {

    constructor
        (
            private _http: HttpClient,
        ) {
        super(_http);
    }

    getAllSize(): Observable<ISize[]> {
        return this.get<ISize[]>(`${API_ENDPOINT.size.base}${API_ENDPOINT.size.list}`);
    }

    getSizeById(id: number): Observable<ISize> {
        return this.get<{ data: ISize }>(`${API_ENDPOINT.size.base}/${id}`).pipe(map(res => res.data));
    }

    addSize(data: ISize): Observable<ISize> {
        return this.post(`${API_ENDPOINT.size.base}${API_ENDPOINT.size.add}`, data);
    }

    updateSize(id: number, data: ISize): Observable<ISize> {
        return this.put<ISize>(`${API_ENDPOINT.size.base}/${id}`, data);
    }

    deleteSize(id: number): Observable<any> {
        return this.delete(`${API_ENDPOINT.size.base}/${id}`);
    }

}