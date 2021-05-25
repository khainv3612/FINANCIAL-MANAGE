import {Message} from './Message';
import {User} from './User';

export class Conversation {
  conversationId: number;
  adminId?: number;
  conversationName?: string;
  createDate?: Date;
  messages ?: Message[];
  paticipants?: User[];
}
