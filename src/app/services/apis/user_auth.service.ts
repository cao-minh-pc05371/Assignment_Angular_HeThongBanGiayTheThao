import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';
import { Observable, map } from 'rxjs';
import { IUser } from 'src/app/interface/user.interface';
import { ILoginResponse } from 'src/app/interface/auth.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {

  constructor
    (
      private _http: HttpClient,
    ) {
    super(_http);
  }

  // Lấy danh sách tất cả người dùng
  getAllUsers(): Observable<IUser[]> {
    return this.get<IUser[]>(`${API_ENDPOINT.user.base}${API_ENDPOINT.user.list}`);
  }

  // Lấy người dùng theo ID
  getUserById(id: number): Observable<IUser> {
    return this.get<{ data: IUser }>(`${API_ENDPOINT.user.base}/${id}`).pipe(map(res => res.data));
  }

  addUser(data: IUser): Observable<IUser> {
    return this.post<IUser>(`${API_ENDPOINT.user.base}${API_ENDPOINT.user.add}`, data);
  }

  updateUser(id: number, data: IUser): Observable<IUser> {
    return this.put<IUser>(`${API_ENDPOINT.user.base}/${id}`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.delete(`${API_ENDPOINT.user.base}/${id}`);
  }

}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  private jwtHelper = new JwtHelperService();

  constructor(private _http: HttpClient) {
    super(_http);
  }

  login(data: { email: string; password: string }): Observable<ILoginResponse> {
    return this.post<ILoginResponse>(`${API_ENDPOINT.auth.base}${API_ENDPOINT.auth.login}`, data);
  }

  register(data: { name: string; email: string; password: string; phone: string }) {
    return this.post(`${API_ENDPOINT.auth.base}${API_ENDPOINT.auth.register}`, data);
  }

  getProfile(id: number): Observable<IUser> {
    const token = localStorage.getItem('token');
    return this._http.get<{ user: IUser }>(`${API_ENDPOINT.auth.base}${API_ENDPOINT.auth.profile}/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }).pipe(
      map(res => res.user)
    );
  }


  updatePassword(id: number, data: { oldPassword: string; newPassword: string }) {
    return this.put(`${API_ENDPOINT.auth.base}${API_ENDPOINT.auth.updatePassword}/${id}`, data);
  }

  resetPassword(data: { email: string; phone: string; newPassword: string }) {
    return this.post(`${API_ENDPOINT.auth.base}${API_ENDPOINT.auth.resetPassword}`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const expired = this.jwtHelper.isTokenExpired(token);
    if (expired) localStorage.clear();
    return !expired;
  }

  override getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }

  decodeToken(): any {
    const token = this.getToken();
    return token ? this.jwtHelper.decodeToken(token) : null;
  }
}