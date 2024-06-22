import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/users/count`);
  }

  getCourseCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/courses/count`);
  }

  getBlogCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/posts/count`);
  }
}
