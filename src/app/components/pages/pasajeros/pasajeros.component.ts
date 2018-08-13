import { Component, OnInit } from '@angular/core';
import { IntranetService } from '../../../services/intranet/intranet.service';
import { ListadoRutas } from '../../../models/transporte/listadoRutas.class';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { IndexedDBService } from '../../../services/DB/indexed-db.service';
declare function init_plugins();
@Component({
  selector: 'app-pasajeros',
  templateUrl: './pasajeros.component.html',
  styles: []
})
export class PasajerosComponent implements OnInit {
  Rutas: ListadoRutas[] = [];
  constructor(public _intranet: IntranetService, private _route: Router,
    private _storage: IndexedDBService) {
   }

  ngOnInit() {
    init_plugins();
    this.listadoDeRutas();
    setTimeout((): void => {
      this.getData();
    }, 500);
  }
  listadoDeRutas() {
    this._intranet.listadoRutas().subscribe(
      (rutas: any) => {
        this.Rutas = rutas.listado;
      }
    );
  }
  BusquedaViajesProgramados(formData: NgForm) {
    if (formData.invalid) {
      swal('Error', 'Debes enviar una información valida para los viajes programados', 'error');
      return;
    }
    this._intranet.viajesProgramadosPorRuta(formData.value.Ruta,
    formData.value.fechaInicio, formData.value.fechaFin).subscribe(
      (listadoViajes: any) => {
        this._intranet.ListaViajes = listadoViajes.listado;
        if (this._intranet.ListaViajes === undefined) {
          swal('alerta', 'No se encontraron resultados de busqueda', 'warning');
          return;
        }
      }
    );
  }
  childManifiesto(idviaje: number | string) {
    this._route.navigate(['/manifiesto/pasajeros', idviaje]);
  }
  async getData() {
    return new Promise(async (resolve, reject) => {
      try {
        const storage = await this._storage.creaDB('manifiesto_pasajeros');
        if (storage.status) {
          const GetManifiestoOffline = await this._storage.getDBStorage('manifiesto_pasajeros');
          console.log(GetManifiestoOffline);
        } else {
          throw new Error('Hubo un error al intentar acceder a la base de datos offline' + storage);
        }
      } catch (error) {
        throw error;
      }
    });
  }
}
