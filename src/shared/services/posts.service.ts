import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePostDto, PostI } from '../models/posts.module';
import { environment } from '../environments/environment.dev'; // Assurez-vous de spécifier le chemin correct

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  create(createUserDto: CreatePostDto): Observable<any> {
    return this.http.post<CreatePostDto>(`${this.apiUrl}/posts`, createUserDto);
  }

  findAll(): Observable<PostI[]> {
    return this.http.get<PostI[]>(`${this.apiUrl}/posts`);
  }
  findOne(id: string): Observable<PostI> {
    return this.http.get<PostI>(`${this.apiUrl}/posts/${id}`);
  }
}
