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
import {HttpClientModule} from '@angular/common/http';
import {AuthGuardService} from './service/auth-guard.service';
import {JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';
import {TaskBarComponent} from './component/nav-footer/task-bar/task-bar.component';
import {RegisterSuccesComponent} from './component/auth/register-succes/register-succes.component';
import {ErrorPageComponent} from './component/auth/error-page/error-page.component';
import {RegisterExpiredComponent} from './component/auth/register-expired/register-expired.component';
import {ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';


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
    RegisterExpiredComponent
  ],
  imports: [
    BrowserModule,
    RouterRoutingModule,
    BrowserAnimationsModule,
    MatModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuardService, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
