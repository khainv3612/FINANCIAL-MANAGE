import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.css']
})
export class NewChatComponent implements OnInit {

  inner = '<i-feather name="plus-circle" style="" class="cursor-pointer"\n' +
    '               title="New contact"></i-feather>';

  constructor() {
  }

  ngOnInit(): void {
  }

}
