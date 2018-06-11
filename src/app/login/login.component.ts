import { Component, HostBinding } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  state: string = '';
  error: any;
  authState: any = null;
  email: any;
  password: any;
  nome: any;


  constructor(public af: AngularFireAuth,private router: Router, public as:AuthenticationService) {
  }

  onSubmit(formData) {
    //console.log(formData.value)
  	if(formData.valid){
  		console.log(formData.value);
      

      this.af.auth.signInWithEmailAndPassword(formData.value.email,formData.value.password).then(
            (success) => {
             localStorage.setItem('userUID', formData.value.email);
             this.router.navigate(['/']);         
          }).catch(
            (err) => {
            console.log(err);
            this.error = err;
          })
  	}
  }


}
