import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { AuthService } from './services/apis/user_auth.service';

@Injectable({ providedIn: 'root' })
export class AuthAdminGuard implements CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}

  canActivateChild(): boolean {
    const token = this.auth.getToken();
    const isLoggedIn = this.auth.isLoggedIn();

    if (isLoggedIn && token) {
      const decoded: any = this.auth.decodeToken();
      if (decoded?.role === 'admin') {
        return true;
      }
    }

    this.router.navigate(['login']);
    return false;
  }
}
