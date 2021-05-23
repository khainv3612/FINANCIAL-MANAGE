import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../service/token-storage.service';
import {AuthService} from '../../../service/auth.service';
import {THIS_EXPR} from '@angular/compiler/src/output/output_ast';
import {Router} from '@angular/router';
import {RouterService} from '../../router/router.service';
import {User} from '../../../model/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  tokenStorage: TokenStorageService;
  roles: string[] = [];
  isNoLogin = false;
  isUserLogin = false;
  isAdminLogin = false;
  currentUser: User;

  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService,
              private routerService: RouterService) {
    this.tokenStorage = tokenStorageService;
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.roles = this.tokenStorage.getUser().roles;
      this.currentUser = this.tokenStorage.getUser();
      if (this.roles.includes('ROLE_USER')) {
        this.isUserLogin = true;
      } else if (this.roles.includes('ROLE_ADMIN')) {
        this.isAdminLogin = true;
      }
    } else {
      this.isNoLogin = true;
    }
  }

  signOut(): void {
    this.tokenStorage.signOut();
    this.routerService.navigateByUrl('home');
  }

}
