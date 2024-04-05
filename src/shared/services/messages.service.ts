import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.dev';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { CreateMessageDto } from "../models/messages.module";

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private apiUrl = environment.apiUrl;
  private socket: Socket;

  constructor(private http: HttpClient) {
    this.socket = io(environment.apiUrl);
  }

  newMessage(createMessageDto: CreateMessageDto): void {
    console.log('New message:', createMessageDto);
    this.socket.emit('newMessage', createMessageDto);
  }

  receiveMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('newMessage', (message) => {
        observer.next(message);
      });
    });
  }

  create(createMessageDto: CreateMessageDto): Observable<CreateMessageDto> {
    console.log(createMessageDto)
    return this.http.post<any>(`${this.apiUrl}/messages`, createMessageDto);
  }
}
