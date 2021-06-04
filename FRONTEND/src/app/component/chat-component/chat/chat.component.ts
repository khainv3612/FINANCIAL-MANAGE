import {Component, OnInit} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {User} from '../../../model/User';
import {AuthService} from '../../../service/auth.service';
import {TokenStorageService} from '../../../service/token-storage.service';
import {ConversationService} from '../../../service/ConversationService';
import {Conversation} from '../../../model/Conversation';
import {Message} from '../../../model/Message';
import {environment} from '../../../../environments/environment';
import {MessageService} from '../../../service/MessageService';
import {UserService} from '../../../service/user.service';
import {MatDialog} from '@angular/material/dialog';
import {NewChatComponent} from '../new-chat/new-chat.component';

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
  isFirstConnect = true;
  isLoadedAllMessage = false;
  pageChat = 0;
  pageFriend = 0;
  pageMessage = 0;
  sizeChat = 10;
  sizeFriend = 10;
  sizeMessage = 5;
  notFound = 'notFound';
  keywordFriend = 'username';
  keywordConv = 'conversationName';

  listFriend: User[];
  listConvSearch: Conversation[];

  onChangeSearch(val: string): void {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e): void {
    // do something when input is focused
    console.log('sdf');
  }


  public addEmoji(event): any {
    this.content = `${this.content}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService,
              private conversationService: ConversationService, private mesageService: MessageService,
              private userService: UserService, private chatService: ConversationService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.currentUser = this.tokenStorageService.getUser();
    }
    this.getAllConversation(this.currentUser.id, environment.PAGEABLE_PAGE_DEFAULT, environment.PAGEABLE_SIZE_DEFAULT);
    this.connect();
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
      this.stompClient.subscribe('/topic/public', (data) => {
        const result = JSON.parse(data.body);
        if (null != result.conversationId) {
          this.lstConversation = [Object.assign([], result)].concat(this.lstConversation);
          return;
        }
        if (this.currentUser.id == result.createId) {
          this.currentConversation.messages.push(result);
          setTimeout(this.scrollMessToEnd, 5);
        } else {
          this.lstConversation.forEach(conv => {
            if (conv.conversationId == result.conversation.conversationId) {
              conv.messages.push(result);
              this.notifyNewMessage(result.conversation.conversationId, false);
              setTimeout(this.scrollMessToEnd, 5);
            }
          });
        }
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
        createdName: this.currentUser.username,
        conversation: {conversationId: this.currentConversation.conversationId},
        type: 'JOIN'
      })
    ).then;
    this.content = '';
  }


  createNewConversation(conversationNamestr: string, paticipantslst: User[]): any {

    this.stompClient.send(
      '/app/chat.chanel',
      {},
      JSON.stringify({
        conversationName: conversationNamestr,
        paticipants: paticipantslst
      })
    );
  }

  getAllConversation(id: number, page: number, size: number): void {
    this.conversationService.getAllConversationByAccountId(id, {page: this.pageChat, size: this.sizeChat}).subscribe(data => {
      this.lstConversation = data;
      console.log(this.lstConversation);
      this.sortMessageInEachConversation();
    }, error => {
      console.log(error);
    });
  }

  bindingChat(conv: Conversation): void {
    // this.connect();
    this.isFirstConnect = false;
    this.currentConversation = conv;
    this.getMessage(conv.conversationId, environment.PAGEABLE_PAGE_DEFAULT, environment.PAGEABLE_SIZE_DEFAULT);

    this.notifyNewMessage(conv.conversationId, true);
    this.showMessage();
  }


  sortMessageCompare(mes1: Message, mes2: Message): any {
    if (mes1.messageId < mes2.messageId) {
      return -1;
    }
    if (mes1.messageId > mes2.messageId) {
      return 1;
    }
    return 0;
  }

  sortMessage(lst: Message[]): void {
    lst.sort(this.sortMessageCompare);
  }

  scrollMessToEnd(): void {
    const objDiv = document.getElementById('message-div');
    objDiv.scrollTop = objDiv.scrollHeight;

  }

  showMessage(): void {
    this.sortMessage(this.currentConversation.messages);
    setTimeout(this.scrollMessToEnd, 5);
  }

  notifyNewMessage(id: number, isJustSeen: boolean): void {
    const messageDiv = document.getElementById('message_preview_' + id);
    isJustSeen ? messageDiv.classList.remove('new-message') : messageDiv.classList.add('new-message');
  }

  sortMessageInEachConversation(): void {
    if (null == this.lstConversation || this.lstConversation.length == 0) {
      return;
    }
    this.lstConversation.forEach(conv => {
      if (null != conv.messages && conv.messages.length > 0) {
        this.sortMessage(conv.messages);
      }
    });
  }

  getMessage(id: number, pageIn: number, sizeIn: number): void {
    this.mesageService.getAllMessageByConversationId(id, {page: pageIn, size: sizeIn}).subscribe(data => {
      this.currentConversation.messages = data;
      this.handleScroll();
    }, error => {
      console.log(error);
    });
  }

  onScroll(): void {
    console.log('scrolled');
  }

  handleScroll(): any {
    const a = document.getElementById('message-div');
    a.onscroll = () => this.detectBottom();
  }


  detectBottom(): void {
    const el = document.getElementById('message-div');
    if (el.scrollTop <= 100) {
      this.getOlderMessage();
    }
  }

  getOlderMessage(): void {
    if (this.isLoadedAllMessage) {
      return;
    }
    this.pageMessage++;
    this.mesageService.getAllMessageByConversationId(this.currentConversation.conversationId, {
      page: this.pageMessage,
      size: this.sizeMessage
    }).subscribe(data => {
      if (data.length) {
        const result = Object.assign([], data);
        this.currentConversation.messages = result.concat(this.currentConversation.messages);
      } else {
        this.isLoadedAllMessage = true;
      }
    }, error => {
      console.log(error);
    });
  }


  selectFriend(item): void {
    // do something with selected item
    let lstPaticipants = [];
    this.lstConversation.forEach(conv => {
      lstPaticipants = conv.paticipants;
      if (lstPaticipants.length == 2 && (lstPaticipants[0].id == item.id || lstPaticipants[1].id == item.id)) {
        this.bindingChat(conv);
      } else {
//
      }
    });
  }

  selectConversation(item): void {
    this.bindingChat(item);
  }

  getListConvByName(keyI: string, pageI: number, sizeI: number): any {
    const param = {
      idUser: this.currentUser.id,
      key: keyI.trim(),
      page: pageI,
      size: sizeI
    };
    this.chatService.getAllConversationByName(param).subscribe(data => {
      this.listConvSearch = data;
    }, error => {
      console.log(error.messages);
    });
  }

  // popup create new chat
  openPopupNewChat(): void {
    const popup = this.dialog.open(NewChatComponent, {
      width: '40%',
      height: '60%',
      data: {},
      position: {top: '5%'},
      panelClass: 'popup-new-chat'
    });

    popup.afterClosed().subscribe(result => {
// code
      const userTemp = {
        id: this.currentUser.id,
        username: this.currentUser.username
      };
      result.paticipants.push(userTemp);
      this.createNewConversation(result.conversationName, result.paticipants);
    });
  }


}
