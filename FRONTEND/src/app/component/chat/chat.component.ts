import {Component, OnInit} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import {$} from 'protractor';
import {User} from '../../model/User';
import {AuthService} from '../../service/auth.service';
import {TokenStorageService} from '../../service/token-storage.service';
import {ConversationService} from '../../service/ConversationService';
import {Conversation} from '../../model/Conversation';
import {Message} from '../../model/Message';

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
  content: string;
  currentUser: User;
  lstConversation: Conversation[];
  currentConversation: Conversation;
  isFirsrConnect = true;

  public addEmoji(event): any {
    this.content = `${this.content}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService,
              private conversationService: ConversationService) {
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.currentUser = this.tokenStorageService.getUser();
    }
    this.getAllConversation(this.currentUser.id);
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
        console.log(hello.body);
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

  sendMessage(): any {
    this.stompClient.send(
      '/app/chat.message',
      {},
      JSON.stringify({
        createId: this.currentUser.id,
        content: this.content,
        username: this.currentUser.username,
        conversation: {conversationId: this.currentConversation.conversationId},
        type: 'JOIN'
      })
    );
  }

  showGreeting(message): any {
    this.greetings.push(message);
  }

  createNewConversation(conversationName: string, paticipants: User[]): any {
    this.stompClient.send(
      '/app/chat.chanel',
      {},
      JSON.stringify({
        conversationName: conversationName,
        paticipants: paticipants
      }), this.stompClient.subscribe('/topic/public', function(e) {
        console.log(e);
      })
    );
  }

  getAllConversation(id: number): void {
    this.conversationService.getAllConversationByAccountId(id).subscribe(data => {
      console.log(data);
      this.lstConversation = data;
    }, error => {
      console.log(error);
    });
  }

  bindingChat(conv: Conversation): void {
    if (this.isFirsrConnect) {
      this.connect();
      this.isFirsrConnect = false;
    }
    this.currentConversation = conv;
    this.currentConversation.messages.sort(this.sortMessage);
    setTimeout(this.scrollMessToEnd, 5);
  }


  sortMessage(mes1: Message, mes2: Message): any {
    if (mes1.messageId < mes2.messageId) {
      return -1;
    }
    if (mes1.messageId > mes2.messageId) {
      return 1;
    }
    return 0;
  }

  scrollMessToEnd(): void {
    let objDiv = document.getElementById('message-div');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

}
