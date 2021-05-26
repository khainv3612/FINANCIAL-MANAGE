import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Conversation} from '../model/Conversation';
import {environment} from '../../environments/environment';
import {Request} from '../model/Request';
import {ConversationSearchDto} from '../model/ConversationSearchDto';

const API = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  constructor(private httpClient: HttpClient) {
  }

  getAllConversationByAccountId(id: number, request: Request): Observable<any> {
    return this.httpClient.post(API + 'api/get_chat/' + id, request);
  }

  getAllConversationByName(request: ConversationSearchDto): Observable<any> {
    return this.httpClient.post(API + 'api/get_chats', request);
  }
}
