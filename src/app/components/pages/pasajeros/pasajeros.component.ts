import { Component, OnInit } from '@angular/core';
import { IntranetService } from '../../../services/intranet/intranet.service';
import { ListadoRutas } from '../../../models/transporte/listadoRutas.class';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { IndexedDBService } from '../../../services/DB/indexed-db.service';
import { SidebarService } from '../../../services/intranet/sidebar.service';
@Component({
  selector: 'app-pasajeros',
  templateUrl: './pasajeros.component.html',
  styles: []
})
export class PasajerosComponent implements OnInit {
  Rutas: ListadoRutas[] = [];
  constructor(public _intranet: IntranetService, private _route: Router,
    public _sidebar: SidebarService) {
    // this._sidebar.DisplaySidebar = false;
   }

  ngOnInit() {
    this.listadoDeRutas();
  }
  listadoDeRutas() {
    this._intranet.listadoRutas().subscribe(
      (rutas: any) => {
        this.Rutas = rutas.listado;
      }
    );
  }
  BusquedaViajesProgramados(formData: NgForm) {
    this._sidebar.loader = true;
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
          this._sidebar.loader = false;
      }
    );
  }
  childManifiesto(idviaje: number | string) {
    this._route.navigate(['/manifiesto/pasajeros', idviaje]);
  }
}
