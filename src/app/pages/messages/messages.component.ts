import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChannelsService } from '../../../shared/services/channels.service';
import { ChannelI } from '../../../shared/models/channels.module';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  channels: ChannelI[] = [];
  filteredChannels: ChannelI[] = [];
  filter: string = '';

  constructor(
    private channelsService: ChannelsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadChannels();
  }

  loadChannels() {
    this.channelsService.findAll().subscribe({
      next: (data: ChannelI[]) => {
        this.channels = data;
        this.filteredChannels = data; // Initialize filteredChannels
      },
      error: (error: any) => {
        console.error('Error fetching members:', error);
      }
    });
  }

  filterChannels() {
    if (this.filter) {
      this.filteredChannels = this.channels.filter(channel =>
        channel.name.toLowerCase().includes(this.filter.toLowerCase())
      );
    } else {
      this.filteredChannels = this.channels;
    }
  }

  navigateToChannel(id: string): void {
    if (id) {
      this.router.navigate([`/channel/${id}`]);
    } else {
      console.error(`Room ID for ${id} is null or undefined.`);
    }
  }
}
