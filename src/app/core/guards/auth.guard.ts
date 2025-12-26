import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    // If token exists -> allow
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // If not logged in -> redirect to dashboard (or login page later)
    return this.router.parseUrl('/dashboard');
  }
}
