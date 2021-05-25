import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Request} from '../model/Request';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private API = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  getAllMessageByConversationId(id: number, request: Request): Observable<any> {
    return this.httpClient.post(this.API + 'api/get_message/' + id, request);
  }
}
