import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {User} from '../../../model/User';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.css']
})
export class NewChatComponent implements OnInit {

  listFriend: User[];
  keySearch = '';
  groupName = '';

  pageFriend = 0;
  pageConv = 0;
  sizeFriend = 7;
  sizeConv = 7;

  isLoadedAllFriend = false;
  isLoadedAllConv = false;

  constructor(private userService: UserService, private matDialog: MatDialogRef<NewChatComponent>) {
  }

  ngOnInit(): void {
    this.getListFriendByUsername();
  }

  getListFriendByUsername(): any {
    this.pageFriend = 0;
    this.sizeFriend = 7;
    const request = {
      page: this.pageFriend,
      size: this.sizeFriend
    };
    this.userService.getListFriendByUsername(this.keySearch.trim(), request).subscribe(data => {
      this.listFriend = data;
      this.handleScroll();
    }, error => {
      console.log(error.messages);
    });
  }


  selectUser(user: User): void {
    this.closeDialogUser(user);
  }

  handleScroll(): any {
    const a = document.getElementById('list_friend');
    a.onscroll = () => this.detectBottom();
  }


  detectBottom(): void {
    const el = document.getElementById('list_friend');
    if (el.offsetHeight + el.scrollTop >= el.scrollHeight) {
      this.getMoreFriend();
    }
  }

  getMoreFriend(): void {
    console.log('dsf');
    if (this.isLoadedAllFriend) {
      return;
    }
    this.pageFriend++;
    this.userService.getListFriendByUsername(this.keySearch, {
      page: this.pageFriend,
      size: this.sizeFriend
    }).subscribe(data => {
      if (data.length) {
        const result = Object.assign([], data);
        this.listFriend = this.listFriend.concat(result);
      } else {
        this.isLoadedAllFriend = true;
      }
    }, error => {
      console.log(error);
    });
  }

  closeDialogUser(user: User): void {
    const newConversation = {
      conversationName: user.username,
      paticipants: [user]
    };
    this.matDialog.close(newConversation);
  }

}
