import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment.dev';
import { AuthLoginDto } from '../models/users.module';
import { JwtService } from "./jwt.service";
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private JwtService: JwtService) {}

  login(credentials: AuthLoginDto): Observable<any> {
    console.log('Credentials in login:', credentials);
    return this.http.post<any>(`${this.apiUrl}/auth`, credentials);
  }

  handleLoginResponse(response: any): void {
    this.JwtService.setAccessToken(response.access_token);
    this.JwtService.setRefreshAccessToken(response.refresh_token);
  }

  getUserRole(): Observable<string | null> {
    const token = this.JwtService.getAccessToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      return of(decoded.roles ? decoded.roles[0] : null);
    }
    return of(null);
  }

  isUserCoach(): Observable<boolean> {
    return this.getUserRole().pipe(
      map(role => role === 'Coach')
    );
  }

  getUserId(): string | null {
    console.log('Getting user ID');
    const token = this.JwtService.getAccessToken();
    console.log('Token:', token);
    if (token) {
      const decoded: any = jwtDecode(token);
      console.log('Decoded:', decoded);
      return decoded.userId;
    }
    return null;
  }
}
