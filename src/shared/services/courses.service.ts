import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../environments/environment.dev";
import {Course} from "../models/course.module";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses`);
  }

  getCoursesByQuery(queryParams: { name?: string; category?: string }): Observable<Course[]> {
    console.log("Paramètres de recherche envoyés :", queryParams);
    return this.http.get<Course[]>(`${this.apiUrl}/courses`, { params: queryParams });
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/courses/${id}`);
  }
}
