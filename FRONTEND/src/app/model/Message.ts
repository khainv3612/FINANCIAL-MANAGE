import {User} from "./User";
import {Conversation} from "./Conversation";

export class Message {
  messageId: number;
  createId?: number;
  username?: string;
  content?: string;
  type?: any;
  createdDateStr ?: string;
  createdDate ?: Date;
  conversation?:Conversation;
}
