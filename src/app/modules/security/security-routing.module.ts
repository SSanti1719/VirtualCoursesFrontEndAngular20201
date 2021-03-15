import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedUserGuard } from 'src/app/guards/authenticated-user.guard';
import { AuthenticatedGuard } from 'src/app/guards/authenticated.guard';
import { UnaunthenticatedGuard } from 'src/app/guards/unaunthenticated.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent,
    canActivate:[UnaunthenticatedGuard]
  },
  {
    path:'logout',
    component: LogoutComponent,
    canActivate:[AuthenticatedGuard]
  },
  {
    path:'reset-password',
    component: ResetPasswordComponent,
    canActivate:[UnaunthenticatedGuard]
  },
  {
    path:'change-password',
    component: ChangePasswordComponent,
    canActivate:[AuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
