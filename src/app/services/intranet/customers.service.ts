import { Injectable, EventEmitter, Output } from '@angular/core';
import { HTTP_SERVICE } from '../services.config';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SystemCustomer } from '../../models/usuario/SystemCustomer.class';
import { ClientUser } from '../../models/usuario/cliente.class';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  @Output() public tableData: EventEmitter<any> = new EventEmitter<any>();
  constructor(private _http: HttpClient) { }
  ListadoPersonas(role: number) {
    const urlCustomer = `${HTTP_SERVICE}listadopersonas_por_rol.php?idrol=${role}&buscado=`;
    return this._http.get(urlCustomer).pipe(
      map( (response: any) => {
        return response;
      }), catchError( (err: any) => {
        console.error(err);
        return new Observable<string | boolean>();
      })
    );
  }
  PersonaId(keyUser: string | Blob) {
    const urlCustomer = `${HTTP_SERVICE}leer_persona_id.php?idpersona=${keyUser}`;
    return this._http.get(urlCustomer).pipe(
      map( (response: any) => {
        return response;
      }), catchError( (err: any) => {
        console.error(err);
        return new Observable<string | boolean>();
      })
    );
  }
  creaPersona(customer: SystemCustomer) {
    const url = HTTP_SERVICE + 'persona_crea_actualiza.php';
    return this._http.post(url, customer).pipe(
      map( (response: any) => {
        return response;
      }), catchError( (err: any) => {
        console.error(err);
        return new Observable<string | boolean>();
      })
    );
  }
  BorraPersona(idpersona: string) {
    const urlCustomer = `${HTTP_SERVICE}persona_eliminar.php`;
    return this._http.post(urlCustomer, {
      idpersona
    }).pipe(
      map( (response: any) => {
        return response;
      }), catchError( (err: any) => {
        console.error(err);
        return new Observable<string | boolean>();
      })
    );
  }
  DocumentosPersona() {
    const urlCustomer = `${HTTP_SERVICE}listadotipos_documento_identidad.php`;
    return this._http.get(urlCustomer).pipe(
      map( (response: any) => {
        return response;
      }), catchError( (err: any) => {
        console.error(err);
        return new Observable<string | boolean>();
      })
    );
  }
  Giros() {
    const urlCustomer = `${HTTP_SERVICE}listadogiroempresa.php`;
    return this._http.get(urlCustomer).pipe(
      map( (response: any) => {
        return response;
      }), catchError( (err: any) => {
        console.error(err);
        return new Observable<string | boolean>();
      })
    );
  }
  Roles() {
    const urlCustomer = `${HTTP_SERVICE}listadoroles.php`;
    return this._http.get(urlCustomer).pipe(
      map( (response: any) => {
        return response;
      }), catchError( (err: any) => {
        console.error(err);
        return new Observable<string | boolean>();
      })
    );
  }
}
