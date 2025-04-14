import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  private cloudName = 'dovmddijy';
  private uploadPreset = 'upload_preset'

  constructor(
    private _http: HttpClient,
  ) { }

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset); // ← sử dụng biến đã định nghĩa
  
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`; // ← sử dụng biến cloudName
  
    return this._http.post<any>(url, formData).pipe(
      map(response => response.secure_url)
    );
  }  
}
