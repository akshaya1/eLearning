import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { AuthGuard } from './guards';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CourselistComponent } from './course/courselist/courselist.component';
import { CreatecourseComponent } from './course/createcourse/createcourse.component';
import { RolesComponent } from './roles/roles.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'courselist', component: CourselistComponent, canActivate: [AuthGuard]},
  { path: 'addcourse', component: CreatecourseComponent, canActivate: [AuthGuard]},
  { path: 'editrole/:userid', component: RolesComponent, canActivate: [AuthGuard]},


  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
