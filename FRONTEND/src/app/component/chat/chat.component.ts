import {Component, OnInit} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import {$} from 'protractor';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public textArea = '';
  public isEmojiPickerVisible: boolean;
  private stompClient: any = null;
  disabled = true;
  greetings: string[] = [];
  username: string;

  public addEmoji(event): any {
    this.textArea = `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  setConnected(connected: boolean): any {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  connect(): any {
    const socket = new SockJS('http://localhost:8080/websocket');
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/public', (hello) => {
        this.showGreeting(JSON.parse(hello.body).greeting);
      });
    });
  }


  disconnect(): any {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    this.setConnected(false);
    console.log('Disconnected!');
  }

  sendName(): any {
    this.stompClient.send(
      '/app/chat.user',
      {},
      JSON.stringify({
        username: this.username,
        content: 'User has joined the chat',
        type: 'JOIN'
      })
    );
  }

  showGreeting(message): any {
    this.greetings.push(message);
  }
}
