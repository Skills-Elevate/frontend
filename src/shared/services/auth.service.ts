import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { environment } from '../environments/environment.dev';
import { AuthLoginDto } from '../models/users.module';
import {JwtService} from "./jwt.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private JwtService: JwtService) {}

  login(credentials: AuthLoginDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth`, credentials);
  }

  handleLoginResponse(response: any): void {
    this.JwtService.setAccessToken(response.access_token);
    this.JwtService.setRefreshAccessToken(response.refresh_token);
  }
}
