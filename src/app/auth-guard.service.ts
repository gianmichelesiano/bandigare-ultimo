// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.authenticated){
    	console.log("this.auth.authenticatedzxc")
    	console.log(this.auth.authenticated)
        this.router.navigate(['login']);
        console.log('1')
        return false;
    }
    return true;
  }
}