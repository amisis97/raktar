import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LoginGuardService } from './auth/login-guard.service';
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
  { path: '', component: HomeComponent, canActivate: [LoginGuardService] },
  { path: 'raktar', component: WarehousePageComponent, canActivate: [LoginGuardService] },
  { path: 'partners', component: PartnersPageComponent, canActivate: [LoginGuardService] },
  { path: 'products', component: ProductsPageComponent, canActivate: [LoginGuardService] },
  { path: 'workers', component: WorkersPageComponent, canActivate: [LoginGuardService] },
  { path: 'receipts', component: ReceiptsPageComponent, canActivate: [LoginGuardService] },
  { path: 'stat', component: StatPageComponent, canActivate: [LoginGuardService] },
  { path: 'home', component: HomeComponent, canActivate: [LoginGuardService] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: HomeComponent, canActivate: [LoginGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
