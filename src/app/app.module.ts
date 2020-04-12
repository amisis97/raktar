import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Angular auth
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
// Form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { LoginGuardSerive } from './auth/login-guard.service';
import { MenuComponent } from './components/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule, MatCardModule, MatDialogModule, MatInputModule,
  MatTableModule, MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { HomeComponent } from './pages/home/home.component';
import { Database } from './database.service';
// Firebase
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { TasksComponent, DialogDetails } from './components/tasks/tasks.component';
import { PartnersComponent } from './components/partners/partners.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { WarehousePageComponent } from './pages/warehouse-page/warehouse-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    NavbarComponent,
    HomeComponent,
    TasksComponent,
    DialogDetails,
    PartnersComponent,
    WarehouseComponent,
    WarehousePageComponent
  ],
  entryComponents: [
    DialogDetails
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
    MatSnackBarModule
  ],
  providers: [
    AuthService,
    LoginGuardSerive,
    Database,
    AngularFirestore,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
