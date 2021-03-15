import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedAdminGuard } from './guards/authenticated-admin.guard';
import { DefaultComponent } from './public/home/default/default.component';

const routes: Routes = [
  {
    path:'home',
    component: DefaultComponent
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'/home',
  },
  {
    path:'security',
    loadChildren: () => import ('./modules/security/security.module').then(n=>n.SecurityModule)
  },
  {
    path:'students',
    loadChildren: () => import ('./modules/students/students.module').then(n=>n.StudentsModule)
  },{
    path:'parameters',
    loadChildren: () => import ('./modules/parameters/parameters.module').then(n=>n.ParametersModule),
    canActivate:[AuthenticatedAdminGuard]
  },

  //This option always may be at the end

  {
    path:'**',
    redirectTo:'/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
