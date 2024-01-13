import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { environment } from '../environments/environment.dev';
import { AuthLoginDto } from '../models/users.module';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private accessTokenKey = 'accessToken';
  private refreshAccessTokenKey = 'refreshToken';

  constructor(private http: HttpClient) {}

  login(credentials: AuthLoginDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth`, credentials);
  }

  handleLoginResponse(response: any): void {
    this.setAccessToken(response.access_token);
    this.setRefreshAccessToken(response.refresh_token);
  }

  setAccessToken(token: string): void {
    localStorage.setItem(this.accessTokenKey, token);
  }

  private setRefreshAccessToken(token: string): void {
    localStorage.setItem(this.refreshAccessTokenKey, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshAccessToken(): string | null {
    return localStorage.getItem(this.refreshAccessTokenKey);
  }

  refreshAccessToken(refreshToken: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/refresh_token`, { refresh_token: refreshToken }).pipe(
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
