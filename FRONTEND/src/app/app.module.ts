import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import {RouterRoutingModule} from './component/router/router/router-routing.module';
import { NavbarComponent } from './component/nav-footer/navbar/navbar.component';
import { FooterComponent } from './component/nav-footer/footer/footer.component';
import { PreLoadComponent } from './component/nav-footer/pre-load/pre-load.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatModule} from './component/material/mat.module';
import {SettingThemeComponent} from './component/nav-footer/setting-theme/setting-theme.component';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    PreLoadComponent,
    SettingThemeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterRoutingModule,
    BrowserAnimationsModule,
    MatModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
