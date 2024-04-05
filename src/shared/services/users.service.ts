import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserDto, UserI } from '../models/users.module';
import { environment } from '../environments/environment.dev';
import { JwtService } from "./jwt.service";

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private JwtService: JwtService) {}

  createUser(createUserDto: CreateUserDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, createUserDto);
  }

  findAllUsers(): Observable<UserI[]> {
    return this.http.get<UserI[]>(`${this.apiUrl}/users`);
  }

  updateName(newName: string): Observable<any> {
    const email = this.JwtService.getUserEmail();
    console.log(email);
    if (!email) {
      throw new Error('Email non trouvé');
    }
    return this.http.put<any>(`${this.apiUrl}/users`, { newName, email });
  }
  getProfile() {
    return this.http.get<any>(`${this.apiUrl}/users/profil`);
  }
}
