import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from "../models/course.model";
import { environment } from '../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses`);
  }
}
