import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../service/auth.service';
import {TokenStorageService} from '../../../service/token-storage.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../../directive/ValidationService';
import {environment} from '../../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterService} from '../../router/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isValidUsername = true;
  isValidPass = true;
  validateService: ValidationService;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  TOKEN_KEY = environment.TOKEN_KEY;
  USER_KEY = environment.USER_KEY;
  isFirstLoad = true;
  returnUrl: string;


  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              private validate: ValidationService, private router: RouterService, private route: ActivatedRoute) {
    this.validateService = validate;
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.returnUrl = this.route.snapshot.paramMap.get('returnUrl') || '/home';
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    this.isFirstLoad = false;
    const {username, password} = this.loginForm.value;
    this.validateForm();
    if (!this.loginForm.valid) {
      console.log('Error;');
      return;
    }
    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        if (this.rememberMe()) {
          window.localStorage.setItem('isRememberMe', String(true));
          window.localStorage.setItem(this.USER_KEY, JSON.stringify(data));
        }
        this.router.navigateByUrl(this.returnUrl);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  validateForm(): any {
    if (!this.isFirstLoad) {
      if (!this.loginForm.get('username').valid) {
        this.isValidUsername = false;
      } else {
        this.isValidUsername = true;
      }

      if (!this.loginForm.get('password').valid) {
        this.isValidPass = false;
      } else {
        this.isValidPass = true;
      }
    }
  }

  rememberMe(): boolean {
    const rememberMe = document.getElementById('remember-me') as HTMLInputElement;
    return rememberMe.checked;
  }

}
