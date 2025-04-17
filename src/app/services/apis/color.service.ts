import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';
import { Observable, map } from 'rxjs';
import { IColor } from 'src/app/interface/color.interface';

@Injectable({
    providedIn: 'root'
})
export class ColorService extends ApiService {

    constructor
        (
            private _http: HttpClient,
        ) {
        super(_http);
    }

    getAllColor(): Observable<IColor[]> {
        return this.get<IColor[]>(`${API_ENDPOINT.color.base}${API_ENDPOINT.color.list}`);
    }

    getColorById(id: number): Observable<IColor> {
        return this.get<{ data: IColor }>(`${API_ENDPOINT.color.base}/${id}`).pipe(map(res => res.data));
    }

    addColor(data: IColor): Observable<IColor> {
        return this.post(`${API_ENDPOINT.color.base}${API_ENDPOINT.color.add}`, data);
    }

    updateColor(id: number, data: IColor): Observable<IColor> {
        return this.put<IColor>(`${API_ENDPOINT.color.base}/${id}`, data);
    }

    deleteColor(id: number): Observable<any> {
        return this.delete(`${API_ENDPOINT.color.base}/${id}`);
    }

}