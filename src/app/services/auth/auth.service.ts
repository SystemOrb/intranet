import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP_SERVICE } from '../services.config';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoginUser } from '../../models/usuario/login.class';
import { ClientUser } from '../../models/usuario/cliente.class';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  adminUser: ClientUser;
  _key: string | number;
  constructor(private _http: HttpClient, private _route: Router) {
    this.loadLocalStorage();
  }

  // LOGIN
loginUser(usuario: LoginUser) {
  let url = HTTP_SERVICE + 'acceso.php';
  url += '?usuario=' + usuario.usuario + '&clave=' + usuario.clave;
  return this._http.get(url).pipe(
    map( (response: any) => {
      return response;
    }), catchError( (err: any) => {
      console.error(err);
      return new Observable<string | boolean>();
    })
  );
 }
 // LOCALSTORAGE
 saveLocalStorage(adminUser: ClientUser) {
   localStorage.setItem('user', JSON.stringify(adminUser));
   localStorage.setItem('_key', adminUser.idpersona.toString());
   this.adminUser = adminUser;
   this._key = adminUser.idpersona;
 }
 logout() {
   localStorage.removeItem('user');
   localStorage.removeItem('_key');
   this.adminUser = null;
   this._key = '';
   this._route.navigate(['/login']);
 }
 loadLocalStorage() {
   this.adminUser = JSON.parse(localStorage.getItem('user')) || null;
   this._key = localStorage.getItem('_key') || '';
 }
 logged(): boolean {
   return ((this._key !== null) && (this._key !== undefined) && (this._key !== '')) ? true : false;
 }
}



