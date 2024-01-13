import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../environments/environment.dev";

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private apiUrl = environment.apiUrl;
  private accessTokenKey = 'accessToken';
  private refreshAccessTokenKey = 'refreshToken';
  constructor(private http: HttpClient) { }

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
