import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';
import {TokenStorageService} from './token-storage.service';
import {environment} from '../../environments/environment';
import {User} from '../model/User';

const AUTH_API = environment.URL_API_AUTH;


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient, public jwtHelper: JwtHelperService,
    private tokenService: TokenStorageService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(window.sessionStorage.getItem(environment.USER_KEY)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public currentUserValue(): User {
    return JSON.parse(window.sessionStorage.getItem(environment.USER_KEY));
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password
    }, httpOptions);
  }

  public isAuthenticated(): boolean {
    if (this.checkIsRemember()) {
      return true;
    }
    const token = this.tokenService.getToken();
    if (null == token) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  public checkIsRemember(): boolean {
    if (null != window.localStorage.getItem('isRememberMe') && null != window.localStorage.getItem(environment.USER_KEY)) {
      const user = JSON.parse(window.localStorage.getItem(environment.USER_KEY));
      this.tokenService.saveToken(user.accessToken);
      this.tokenService.saveUser(window.localStorage.getItem(environment.USER_KEY));
      return true;
    }
    return false;
  }
}
