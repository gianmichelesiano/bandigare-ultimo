import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MyDataService } from './services/mydataservice';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent, appRoutes } from './app.component';

import { ExComponent } from './ex/ex.component';
import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { AngularFireDatabaseModule } from 'angularfire2/database';
import { RouterModule, Routes} from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { LOCALE_ID } from '@angular/core';

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { HttpClientModule, HttpClient  } from '@angular/common/http';
import { ProvinciePipe } from './provincie.pipe';
import { ImportoPipe } from './importo.pipe';
import { CapitPipe } from './capit.pipe';
import { ScorporabiliPipe } from './scorporabili.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import {ReactiveFormsModule} from "@angular/forms"; 
import {FlexLayoutModule} from '@angular/flex-layout';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule, 
  MatCardModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatSelectModule,
  MatInputModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { RicercaComponent } from './ricerca/ricerca.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RecaptchaModule } from 'ng-recaptcha';


@NgModule({
  declarations: [
    AppComponent,
    ExComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    RegistrazioneComponent,
    RicercaComponent,
    ForgotPasswordComponent,  
    ProvinciePipe,
    ImportoPipe,
    CapitPipe,
    ScorporabiliPipe,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RecaptchaModule.forRoot(),
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    InfiniteScrollModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FlexLayoutModule

  ],
  providers: [
    AuthenticationService,
    MyDataService,
    AuthGuardService,
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'it', 
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);