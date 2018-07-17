import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {

  constructor(private _auth: AuthService, private _route: Router) {
    console.log('GUARD');
  }


  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this._auth.logged()) {
      return true;
    } else {
      this._route.navigate(['/login']);
    }
  }
}
