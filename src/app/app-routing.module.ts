import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LoginGuardSerive } from './auth/login-guard.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { WarehousePageComponent } from './pages/warehouse-page/warehouse-page.component';
import { PartnersPageComponent } from './pages/partners-page/partners-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { WorkersPageComponent } from './pages/workers-page/workers-page.component';
import { StatPageComponent } from './pages/stat-page/stat-page.component';
import { ReceiptsPageComponent } from './pages/receipts-page/receipts-page.component';


const routes: Routes = [
  // { path: '', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [LoginGuardSerive] },
  { path: 'raktar', component: WarehousePageComponent, canActivate: [LoginGuardSerive] },
  { path: 'partners', component: PartnersPageComponent, canActivate: [LoginGuardSerive] },
  { path: 'products', component: ProductsPageComponent, canActivate: [LoginGuardSerive] },
  { path: 'workers', component: WorkersPageComponent, canActivate: [LoginGuardSerive] },
  { path: 'receipts', component: ReceiptsPageComponent, canActivate: [LoginGuardSerive] },
  { path: 'stat', component: StatPageComponent, canActivate: [LoginGuardSerive] },
  { path: 'home', component: HomeComponent, canActivate: [LoginGuardSerive] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: HomeComponent, canActivate: [LoginGuardSerive] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
