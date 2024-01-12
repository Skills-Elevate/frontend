import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserDto, UserI } from '../models/users.module';
import { environment } from '../environments/environment.dev'; // Assurez-vous de spécifier le chemin correct

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createUser(createUserDto: CreateUserDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, createUserDto);
  }

  findAllUsers(): Observable<UserI[]> {
    return this.http.get<UserI[]>(`${this.apiUrl}/users`);
  }
}
