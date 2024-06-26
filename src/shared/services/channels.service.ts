import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateChannelDto, ChannelI } from '../models/channels.module';
import { environment } from '../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class ChannelsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  create(createChannelDto: { courseId: string | undefined }): Observable<CreateChannelDto> {
    return this.http.post<CreateChannelDto>(`${this.apiUrl}/channels`, createChannelDto);
  }

  findAll(): Observable<ChannelI[]> {
    return this.http.get<ChannelI[]>(`${this.apiUrl}/channels`);
  }

  findOne(id: string): Observable<ChannelI> {
    return this.http.get<ChannelI>(`${this.apiUrl}/channels/${id}`);
  }
}
