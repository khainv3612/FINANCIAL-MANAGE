import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HomeComponent} from './component/home/home.component';
import {RouterRoutingModule} from './component/router/router/router-routing.module';
import {NavbarComponent} from './component/nav-footer/navbar/navbar.component';
import {FooterComponent} from './component/nav-footer/footer/footer.component';
import {PreLoadComponent} from './component/nav-footer/pre-load/pre-load.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatModule} from './component/material/mat.module';
import {SettingThemeComponent} from './component/nav-footer/setting-theme/setting-theme.component';
import {LoginComponent} from './component/auth/login/login.component';
import {RegisterComponent} from './component/auth/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthGuardService} from './service/auth-guard.service';
import {JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';
import {TaskBarComponent} from './component/nav-footer/task-bar/task-bar.component';
import {RegisterSuccesComponent} from './component/auth/register-succes/register-succes.component';
import {ErrorPageComponent} from './component/auth/error-page/error-page.component';
import {RegisterExpiredComponent} from './component/auth/register-expired/register-expired.component';
import {ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {NgxLoadingModule} from 'ngx-loading';
import {SocialLoginModule, SocialAuthServiceConfig} from 'angularx-social-login';
import {GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';
import {ChatComponent} from './component/chat-component/chat/chat.component';
import {PickerModule} from '@ctrl/ngx-emoji-mart';
import {FeatherModule} from 'angular-feather';
import {IconsModule} from './directive/ icon.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {NewChatComponent} from './component/chat-component/new-chat/new-chat.component';
import {AuthInterceptor} from './Interceptor/auth.interceptor';
import {MatRadioModule} from '@angular/material/radio';
import {MatTreeModule} from '@angular/material/tree';
import {MAT_CHECKBOX_DEFAULT_OPTIONS, MatCheckboxDefaultOptions, MatCheckboxModule} from '@angular/material/checkbox';
import {NotifierModule, NotifierOptions} from 'angular-notifier';
import {DateMessPipe} from './directive/DateMessPipe';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TooltipModule} from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    PreLoadComponent,
    SettingThemeComponent,
    LoginComponent,
    RegisterComponent,
    TaskBarComponent,
    RegisterSuccesComponent,
    ErrorPageComponent,
    RegisterExpiredComponent,
    ChatComponent,
    NewChatComponent,
    DateMessPipe,
  ],
  imports: [
    NotifierModule.withConfig(customNotifierOptions),
    BrowserModule,
    RouterRoutingModule,
    BrowserAnimationsModule,
    MatModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    SocialLoginModule,
    PickerModule,
    IconsModule,
    InfiniteScrollModule,
    AutocompleteLibModule,
    MatRadioModule,
    MatTreeModule,
    MatCheckboxModule,
    MatTooltipModule,
    TooltipModule,
    NgbModule
  ],
  providers: [AuthGuardService, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    {
      provide: HTTP_INTERCEPTORS,

      useClass: AuthInterceptor,

      multi: true

    },
    JwtHelperService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '289117989557-2v3dehq71dve9g3vrau2nurk2b2eehm7.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '1071643186574715'
            )
          },
          {provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: {clickAction: 'noop'} as MatCheckboxDefaultOptions}
        ]
      } as SocialAuthServiceConfig,
    }],
  bootstrap: [AppComponent]
})

export class AppModule {
}
