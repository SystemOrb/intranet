import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP_SERVICE } from '../services.config';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntranetService {
  public searchDate: Date;
  constructor(private _http: HttpClient) { }

  listadoTrabajadores(idrole: string | number, search: string) {
    let url = HTTP_SERVICE + 'listadopersonas_por_rol.php';
    url += '?idrol=' + idrole + '&buscado=' + search;
    return this._http.get(url).pipe(
      map( (response: any) => {
        return response;
      }), catchError( (err: any) => {
        console.error(err);
        return new Observable<string | boolean>();
      })
    );
  }
  listadoRutas() {
    const url = HTTP_SERVICE + 'listadorutas.php';
    return this._http.get(url).pipe(
      map( (response: any) => {
        return response;
      }), catchError( (err: any) => {
        console.error(err);
        return new Observable<string | boolean>();
      })
    );
  }
  viajesProgramadosPorRuta(id_route: number | string,
    dateStart: Date | string, dateEnd: Date | string) {
    let url = HTTP_SERVICE + 'listadoviajesprogramados_por_ruta.php';
    url += '?idruta=' + id_route + '&fecha1=' + dateStart;
    url += '&fecha2=' + dateEnd;
    return this._http.get(url).pipe(
      map( (response: any) => {
        return response;
      }), catchError( (err: any) => {
        console.error(err);
        return new Observable<string | boolean>();
      })
    );
  }
}
