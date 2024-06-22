import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment.dev';
import { AuthLoginDto } from '../models/users.module';
import { JwtService } from './jwt.service';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  login(credentials: AuthLoginDto): Observable<any> {
    console.log('AuthService: Attempting to login', credentials);
    return this.http.post<any>(`${this.apiUrl}/auth`, credentials).pipe(
      map(response => {
        this.handleLoginResponse(response);
        this.loggedIn.next(true);  // Update loggedIn status
        return response;
      }),
      tap({
        error: err => console.error('AuthService: Login failed', err),
      })
    );
  }

  handleLoginResponse(response: any): void {
    console.log('AuthService: Handling login response', response);
    this.jwtService.setAccessToken(response.access_token);
    this.jwtService.setRefreshAccessToken(response.refresh_token);
  }

  getUserRole(): Observable<string | null> {
    const token = this.jwtService.getAccessToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      console.log('AuthService: Decoded token', decoded);
      return of(decoded.roles ? decoded.roles[0] : null);
    }
    return of(null);
  }

  isAdmin(): Observable<boolean> {
    return this.getUserRole().pipe(
      map(role => role === 'admin'),
      tap(isAdmin => console.log('AuthService: User is admin', isAdmin)),
    );
  }

  isUserCoach(): Observable<boolean> {
    return this.getUserRole().pipe(
      map(role => role === 'Coach'),
      tap(isCoach => console.log('AuthService: User is coach', isCoach)),
    );
  }

  isCoach(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/users/is-coach`).pipe(
      tap(isCoach => console.log('AuthService: User is coach', isCoach)),
    );
  }

  getUserId(): string | null {
    const token = this.jwtService.getAccessToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      console.log('AuthService: User ID', decoded.userId);
      return decoded.userId;
    }
    return null;
  }

  logout(): void {
    console.log('AuthService: Logging out');
    this.jwtService.clearTokens();
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  hasToken(): boolean {
    const hasToken = !!this.jwtService.getAccessToken();
    console.log('AuthService: Has token', hasToken);
    return hasToken;
  }
}
