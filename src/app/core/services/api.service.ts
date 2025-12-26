import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

type QueryParams = Record<string, string | number | boolean | null | undefined>;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // ---------- helpers ----------
  private buildUrl(path: string): string {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${this.baseUrl}${cleanPath}`;
  }

  private buildParams(params?: QueryParams): HttpParams {
    let httpParams = new HttpParams();
    if (!params) return httpParams;

    Object.keys(params).forEach((key) => {
      const val = params[key];
      if (val === null || val === undefined || val === '') return;
      httpParams = httpParams.set(key, String(val));
    });

    return httpParams;
  }

  private buildHeaders(extra?: Record<string, string>): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(extra || {})
    });
    return headers;
  }

  // ---------- HTTP methods ----------
  get<T>(path: string, params?: QueryParams): Observable<T> {
    return this.http.get<T>(this.buildUrl(path), {
      headers: this.buildHeaders(),
      params: this.buildParams(params)
    });
  }

  post<T>(path: string, body?: any): Observable<T> {
    return this.http.post<T>(this.buildUrl(path), body ?? {}, {
      headers: this.buildHeaders()
    });
  }

  put<T>(path: string, body?: any): Observable<T> {
    return this.http.put<T>(this.buildUrl(path), body ?? {}, {
      headers: this.buildHeaders()
    });
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(this.buildUrl(path), {
      headers: this.buildHeaders()
    });
  }
}
