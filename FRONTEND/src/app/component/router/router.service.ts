import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TokenStorageService} from '../../service/token-storage.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  constructor(
    private http: HttpClient, private tokenService: TokenStorageService, private router: Router) {
  }

  public navigateByUrl(url: string): void {
    this.router.navigateByUrl(url).then(() => {
      if (url != '/login') {
        window.location.reload();
      }
    });
  }
}
