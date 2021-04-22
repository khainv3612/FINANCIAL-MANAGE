import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../../home/home.component';
import {LoginComponent} from '../../auth/login/login.component';
import {RegisterComponent} from '../../auth/register/register.component';
import {
  AuthGuardService as AuthGuard
} from '../../../service/auth-guard.service';
import {RegisterSuccesComponent} from '../../auth/register-succes/register-succes.component';
import {ErrorPageComponent} from '../../auth/error-page/error-page.component';
import {RegisterExpiredComponent} from '../../auth/register-expired/register-expired.component';
import {Role} from '../../../model/Role';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'profile', component: HomeComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin]}},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'activeaccout_success', component: RegisterSuccesComponent},
  {path: 'error_page', component: ErrorPageComponent},
  {path: 'active_expired', component: RegisterExpiredComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RouterRoutingModule {
}
