import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {User} from '../../../model/User';
import {MatDialogRef} from '@angular/material/dialog';
import {NotifierService} from 'angular-notifier';

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

  paticipantsConv: User[];

  lstIdChoose: string[];
  notifier: NotifierService;

  constructor(private userService: UserService, private matDialog: MatDialogRef<NewChatComponent>,
              private notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.isLoadedAllFriend = false;
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
    if (null != a) {
      a.onscroll = () => this.detectBottomFriend();
    } else {
      const b = document.getElementById('list_user');
      b.onscroll = () => this.detectBottomuser();
    }
  }


  detectBottomFriend(): void {
    const el = document.getElementById('list_friend');
    if (el.offsetHeight + el.scrollTop >= el.scrollHeight) {
      this.getMoreFriend();
    }
  }

  detectBottomuser(): void {
    const el = document.getElementById('list_user');
    if (el.offsetHeight + el.scrollTop >= el.scrollHeight) {
      this.getMoreFriend();
    }
  }

  getMoreFriend(): void {
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

  chooseUser(id: string, user: User): void {
    const ele = document.getElementById(id) as HTMLInputElement;
    if (!this.paticipantsConv && !this.lstIdChoose) {
      this.paticipantsConv = [user];
      this.lstIdChoose = [id];
      return;
    }
    if (ele.checked) {
      this.paticipantsConv.push(user);
      this.lstIdChoose.push(id);
    } else {
      this.paticipantsConv = this.paticipantsConv.filter(item => item.id !== user.id);
      this.lstIdChoose = this.lstIdChoose.filter(item => item !== id);
    }

  }

  createNewGroup(): void {
    if (!this.validateNewGroup()) {
      return;
    }

    const newConversation = {
      conversationName: this.groupName,
      paticipants: this.paticipantsConv
    };
    this.matDialog.close(newConversation);
  }

  validateNewGroup(): boolean {
    if (this.groupName === '') {
      this.showNotification('error', 'Please input group name');
      return false;
    }

    if (null == this.lstIdChoose || this.lstIdChoose.length <= 1) {
      this.showNotification('error', 'Please choose at least 2 friends!');
      return false;
    }
    return true;
  }

  showNotification(typeI, messageI): void {
    this.notifier.show({
      message: messageI,
      type: typeI,
    });
  }

}
