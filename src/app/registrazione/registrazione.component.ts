import { Component, HostBinding } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {MatSnackBar} from '@angular/material';
import { FormGroup, FormControl,  FormGroupDirective, NgForm, Validators,  FormBuilder } from '@angular/forms'; 
import {ErrorStateMatcher} from '@angular/material/core';

export interface FormModel {
  captcha?: string;

}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})



export class RegistrazioneComponent {


  public formModel: FormModel = {};

  state: string = '';
  error: any;
  authState: any = null;
  recaptcha: string = ''
  messagge : string = ''
  messaggioCampi : string = ''




  registrationForm: FormGroup; 
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  nome = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder, public db: AngularFireDatabase, public snackBar: MatSnackBar, public af: AngularFireAuth,private router: Router, public as:AuthenticationService) {


    this.registrationForm = this.fb.group({
      email:this.email,
      password:this.password,
      nome:this.nome,

    });
  }

  getMailErrorMessage() {
    return this.email.hasError('required') ? 'Immettere il valore' :
        this.email.hasError('email') ? 'Non è un indirizzo di mail valido' :
            '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Si prega di digitare la password' :
            '';
  }

  getNomeErrorMessage() {
    return this.nome.hasError('required') ? 'Si prega di digitare il nome' :
            '';
  }

  onSubmit(formData) {
    if (this.recaptcha !=''){

        this.messagge = 'Controllo OK'
        if(formData.valid){

              let email = formData.value.email
              let password =  formData.value.password
              let nome = formData.value.nome
              this.af.auth.createUserWithEmailAndPassword(email, password).then((user) => {
                const itemsRef = this.db.list('DatiUtente');
                itemsRef.set(this.as.currentUserId, { nome: nome });

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

      this.messagge = 'Si prega di eseguire il controllo'
    }
  }

  resolved(captchaResponse: string) {

        this.messagge = 'Controllo OK'
        this.recaptcha =  captchaResponse

  }


}
