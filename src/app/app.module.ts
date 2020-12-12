import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Angular auth
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, MatPaginatorIntlHu } from './app.component';
import { LoginComponent } from './auth/login/login.component';
// Form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { LoginGuardService } from './auth/login-guard.service';
import { VisibilityService } from './auth/visibility.service';
import { MenuComponent } from './components/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatNativeDateModule, MatOption, MatOptionModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule, MatCardModule, MatDialogModule, MatInputModule,
  MatTableModule, MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatSelect, MatSelectModule } from '@angular/material';
import { HomeComponent } from './pages/home/home.component';
import { Database } from './database.service';
// Firebase
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { TasksComponent, DialogDetails } from './components/tasks/tasks.component';
import { PartnersComponent, PartnerDialogDetails } from './components/partners/partners.component';
import { WarehouseComponent, WarehouseDialogDetails } from './components/warehouse/warehouse.component';
import { WarehousePageComponent } from './pages/warehouse-page/warehouse-page.component';
import { PartnersPageComponent } from './pages/partners-page/partners-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductsComponent, ProductDialogDetails } from './components/products/products.component';
import { WorkersPageComponent } from './pages/workers-page/workers-page.component';
import { WorkerDialogDetails, WorkersComponent } from './components/workers/workers.component';
import { StatPageComponent } from './pages/stat-page/stat-page.component';
import { BuyStatComponent } from './components/buy-stat/buy-stat.component';
import { SellStatComponent } from './components/sell-stat/sell-stat.component';
import { ReceiptsPageComponent } from './pages/receipts-page/receipts-page.component';
import { ReceiptsComponent } from './components/receipts/receipts.component';
import { SellComponent } from './components/sell/sell.component';
import { SellPageComponent } from './pages/sell-page/sell-page.component';

import { ChartsModule, ThemeService } from 'ng2-charts';
import { ServiceWorkerModule } from '@angular/service-worker';
import { WorkerTasksComponent } from './components/worker-tasks/worker-tasks.component';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    NavbarComponent,
    HomeComponent,
    TasksComponent,
    DialogDetails,
    PartnerDialogDetails,
    ProductDialogDetails,
    WarehouseDialogDetails,
    WorkerDialogDetails,
    PartnersComponent,
    WarehouseComponent,
    WarehousePageComponent,
    PartnersPageComponent,
    ProductsPageComponent,
    ProductsComponent,
    WorkersPageComponent,
    WorkersComponent,
    StatPageComponent,
    BuyStatComponent,
    SellStatComponent,
    ReceiptsPageComponent,
    ReceiptsComponent,
    SellComponent,
    SellPageComponent,
    WorkerTasksComponent
  ],
  entryComponents: [
    DialogDetails,
    PartnerDialogDetails,
    ProductDialogDetails,
    WarehouseDialogDetails,
    WorkerDialogDetails
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatSelectModule,
    MatOptionModule,
    MatListModule,
    MatSortModule,
    MatPaginatorModule,
    ChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    AuthService,
    LoginGuardService,
    VisibilityService,
    Database,
    AngularFirestore,
    MatDatepickerModule,
    MatNativeDateModule,
    [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlHu}],
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
