import { Component , OnInit} from '@angular/core';
import { AngularFireDatabase , AngularFireObject} from 'angularfire2/database';
import { Observable } from 'rxjs';


import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { RicercaComponent } from './ricerca/ricerca.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ActivatedRoute,Router, Routes} from '@angular/router';


export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent} ,
  { path: 'logout', component: LogoutComponent} ,
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'registrazione', component: RegistrazioneComponent },
  { path: 'ricerca', component: RicercaComponent },
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

  constructor(private db: AngularFireDatabase) {


  }

  ngOnInit() {

  }


}
