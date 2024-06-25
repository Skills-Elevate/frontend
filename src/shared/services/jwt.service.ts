import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment.dev';
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private apiUrl = environment.apiUrl;
  private accessTokenKey = 'accessToken';
  private refreshAccessTokenKey = 'refreshToken';

  constructor(private http: HttpClient) {}

  setAccessToken(token: string): void {
    localStorage.setItem(this.accessTokenKey, token);
  }

  setRefreshAccessToken(token: string): void {
    localStorage.setItem(this.refreshAccessTokenKey, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshAccessToken(): string | null {
    return localStorage.getItem(this.refreshAccessTokenKey);
  }

  getUserEmail(): string | null {
    const token = this.getAccessToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.userEmail;
    }
    return null;
  }

  refreshAccessToken(): Observable<any> {
    const refreshToken = this.getRefreshAccessToken();
    if (!refreshToken) {
      return throwError('No refresh token available');
    }
    return this.http.post<any>(`${this.apiUrl}/auth/refresh_token`, { refresh_token: refreshToken }).pipe(
      tap(response => {
        this.setAccessToken(response.access_token);
      }),
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          console.error('Refresh token expired:', error);
        }
        return throwError(error);
      })
    );
  }

  clearTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshAccessTokenKey);
  }
}
