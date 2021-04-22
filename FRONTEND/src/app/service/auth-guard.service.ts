import {Component, Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Constant} from '../constant';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login', {returnUrl: state.url}]);
      return false;
    }
    const currentUser = JSON.parse(window.sessionStorage.getItem(environment.USER_KEY));
    if (route.data.roles && !currentUser.roles.includes(route.data.roles[0])) {
      // role not authorised so redirect to home page
      this.router.navigate(['/error_page', {title: Constant.NOT_PERMISION}]);
      return false;
    }
    return true;
  }
}
