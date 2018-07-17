import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  error: any;
  email: any;
  password: any;
  nome: any;

  constructor() { }


  onSubmit(formData) {
  	if(formData.valid){
      var auth = firebase.auth();
      return auth.sendPasswordResetEmail(formData.value.email)
        .then(() => console.log("email sent"))
        .catch((error) => console.log(error))
    	}
  }


  ngOnInit() {
  }

}
