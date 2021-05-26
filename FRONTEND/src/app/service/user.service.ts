import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Request} from '../model/Request';
import {User} from '../model/User';

const API_URL_AUTH = environment.URL_API_AUTH;
const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL_AUTH + 'all', {responseType: 'text'});
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL_AUTH + 'user', {responseType: 'text'});
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL_AUTH + 'mod', {responseType: 'text'});
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL_AUTH + 'admin', {responseType: 'text'});
  }

  getListFriendByUsername(keyIn: string, request: Request): Observable<any> {
    return this.http.post(API + 'api/get_friends', {key: keyIn, page: request.page, size: request.size});
  }

}
