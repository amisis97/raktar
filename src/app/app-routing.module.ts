import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LoginGuardSerive } from './auth/login-guard.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { WarehousePageComponent } from './pages/warehouse-page/warehouse-page.component';
import { PartnersPageComponent } from './pages/partners-page/partners-page.component';


const routes: Routes = [
  // { path: '', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [LoginGuardSerive] },
  { path: 'raktar', component: WarehousePageComponent, canActivate: [LoginGuardSerive] },
  { path: 'partners', component: PartnersPageComponent, canActivate: [LoginGuardSerive] },
  { path: 'home', component: HomeComponent, canActivate: [LoginGuardSerive] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: HomeComponent, canActivate: [LoginGuardSerive] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
