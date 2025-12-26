import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    //If no token, send request as-is
    if(!token) {
      return next.handle(request);
    }
    
    
    //Clone request aND ATTACH AUTH HEADER
    const authReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    
    
    return next.handle(authReq);
  }
}
