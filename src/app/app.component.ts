import { Component , OnInit} from '@angular/core';
import { AngularFireDatabase , AngularFireObject} from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';


import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { RicercaComponent } from './ricerca/ricerca.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ActivatedRoute,Router, Routes} from '@angular/router';
import { AuthGuardService as AuthGuard  } from './auth-guard.service';
import { DettaglioGaraComponent } from './dettaglio-gara/dettaglio-gara.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent} ,
  { path: 'logout', component: LogoutComponent} ,
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'registrazione', component: RegistrazioneComponent },
  { path: 'dettaglio', component: DettaglioGaraComponent },
  { path: 'ricerca', component: RicercaComponent , canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
]


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  gare: Observable<any[]>;
  gareObj: Observable<any>;
  gareObject: AngularFireObject<any>;
  isAuth:boolean=false;

  constructor(private db: AngularFireDatabase, public auth: AuthenticationService) {


  }

  ngOnInit() {
    this.isAuth = this.auth.authenticated
  }


}
