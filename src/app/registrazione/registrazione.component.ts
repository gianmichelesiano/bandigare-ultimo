import { Component, HostBinding } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {MatSnackBar} from '@angular/material';


export interface FormModel {
  captcha?: string;

}

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})



export class RegistrazioneComponent {

  email: any;
  password: any;
  nome: any;
  public formModel: FormModel = {};

  state: string = '';
  error: any;
  authState: any = null;
  recaptcha: string = ''
  messagge : string = ''
  messaggioCampi : string = ''




  constructor(public db: AngularFireDatabase, public snackBar: MatSnackBar, public af: AngularFireAuth,private router: Router, public as:AuthenticationService) {

  }

  onSubmit(formData) {
    if (this.recaptcha !=''){
        console.log(this.recaptcha)
        this.messagge = 'Controllo OK'
        if(formData.valid){
              let email = formData.value.email
              let password =  formData.value.password
              let nome = formData.value.nome
              this.af.auth.createUserWithEmailAndPassword(email, password).then((user) => {
                const itemsRef = this.db.list('DatiUtente');
                itemsRef.set(user.uid, { nome: nome });


                this.af.auth.signInWithEmailAndPassword(email, password).then(() => {
                  localStorage.setItem('userUID', email);
                  this.router.navigate(['/']); 
                });

              }).catch((_error) => {
                    let errors = '';
                    if( _error.code === 'auth/weak-password') errors += 'La password deve avere almeno 6 caratteri.';
                    if( _error.code === 'auth/email-already-in-use') errors += 'Questa email é già stata utilizzata.';

                        this.snackBar.open(errors, '', {
                        duration: 3000,
                      }); 
              })
        } 
    } else {
      console.log('captcha error')
      this.messagge = 'Si prega di eseguire il controllo'
    }
  }

  resolved(captchaResponse: string) {
        console.log(captchaResponse);
        this.recaptcha =  captchaResponse
  }


}
