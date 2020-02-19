import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LoginGuardSerive } from './auth/login-guard.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  //{ path: '', component: LoginComponent },
  { path: '', component: AppComponent, canActivate: [LoginGuardSerive] },
  { path: 'home', component: HomeComponent, canActivate: [LoginGuardSerive] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
