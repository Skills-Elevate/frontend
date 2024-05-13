import { AfterViewChecked, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ChannelsService } from '../../../shared/services/channels.service';
import { MessagesService } from '../../../shared/services/messages.service';
import { ChannelI } from '../../../shared/models/channels.module';
import { CreateMessageDto } from '../../../shared/models/messages.module';
import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit, AfterViewChecked  {
  channel!: ChannelI;
  newMessage!: CreateMessageDto;
  messageInput: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private channelsService: ChannelsService,
    private messagesService: MessagesService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const channelId = params['id'];
      this.loadChannel(channelId);
    });
  }

  ngAfterViewChecked(): void {
    this.scrollChatToBottom();
  }

  loadChannel(channelId: string): void {
    this.channelsService.findOne(channelId).subscribe({
      next: (data) => {
        this.channel = data;
        this.messagesService.joinChannel(channelId);

        this.messagesService.receiveMessages().subscribe((message) => {
          if (message.channelId === this.channel.id) {
            this.channel.messages.push(message);
          }
        });
      },
      error: (error) => {
        console.error(`Une erreur s'est produite lors de la récupération du canal : ${error}`);
      },
    });
  }

  sendMessage(): void {
    // Vérifier si l'entrée de message n'est pas vide
    if (this.messageInput.trim() === '') {
      return;
    }

    // Créer le nouveau message
    this.newMessage = {
      channelId: this.channel.id,
      content: this.messageInput
    };

    // Enregistrer le message sur le backend et gérer la réponse
    this.messagesService.create(this.newMessage).subscribe({
      next: (response: any) => {
        console.log('Message created successful');

        // Afficher le message en temps réel en utilisant les données de la réponse
        const displayMessage = {
          content: response.content,
          createdAt: response.createdAt,
          author: {
            name: this.channel.currentUserName,
          },
          channelId: response.channelId,
        };

        console.log(displayMessage)

        // Appeler la méthode du service pour afficher le nouveau message
        this.messagesService.newMessage(displayMessage);
      },
      error: (error) => {
        console.error('Message creation failed:', error);
      },
    });

    // Effacer le champ d'entrée après l'envoi du message
    this.messageInput = '';
  }

  scrollChatToBottom(): void {
    try {
      this.document.body.scrollTop = this.document.body.scrollHeight;
      this.document.documentElement.scrollTop = this.document.documentElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
