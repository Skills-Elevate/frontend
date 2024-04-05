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

  create(createUserDto: CreateChannelDto): Observable<CreateChannelDto> {
    return this.http.post<CreateChannelDto>(`${this.apiUrl}/channels`, createUserDto);
  }

  findAll(acceptedAccess: boolean): Observable<ChannelI[]> {
    return this.http.get<ChannelI[]>(`${this.apiUrl}/channels`, {
      params: { acceptedAccess: acceptedAccess.toString() },
    });
  }

  findOne(id: string): Observable<ChannelI> {
    return this.http.get<ChannelI>(`${this.apiUrl}/channels/${id}`);
  }

  joinChannel(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/channels/joinchannel/${id}`, {});
  }
}
