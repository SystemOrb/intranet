import { Component, OnInit } from '@angular/core';
import { IntranetService } from '../../../services/intranet/intranet.service';
import { ActivatedRoute } from '@angular/router';
import { Bus } from '../../../models/viajes_programados/bus.class';
import { Pasajeros } from '../../../models/viajes_programados/pasajeros.class';
import { Ruta } from '../../../models/viajes_programados/ruta.class';
import { Tripulacion } from '../../../models/viajes_programados/tripulacion.class';
declare const swal: any;
declare function init_plugins();
@Component({
  selector: 'app-order-manifiesto',
  templateUrl: './order-manifiesto.component.html',
  styles: []
})
export class OrderManifiestoComponent implements OnInit {
  idviaje: string | number;
  // Propiedades del manifiesto
  Bus: Bus;
  Pasajeros: Pasajeros[] = [];
  Ruta: Ruta;
  Tripulacion: Tripulacion;
  isDevice: boolean;
  constructor(private _intranet: IntranetService, private _param: ActivatedRoute) {
    this._param.params.subscribe(
      (get: any) => {
        this.idviaje = get['idviaje'];
        const isMobile = navigator.userAgent.match(
          /(iPhone|iPod|iPad|Android|webOS|BlackBerry|IEMobile|Opera Mini)/i);
        if (isMobile === null || (!isMobile)) {
          this.isDevice = false;
        } else {
          this.isDevice = true;
        }
      }
    );
  }

  ngOnInit() {
    init_plugins();
    this.obtenerManifiesto();
  }
  obtenerManifiesto() {
    this._intranet.manifiestoPasajeros(this.idviaje).subscribe(
      (manifiesto: any) => {
        this.Tripulacion = manifiesto.tripulacion[0];
        this.Ruta = manifiesto.ruta[0];
        this.Bus = manifiesto.bus[0];
        this.Pasajeros = manifiesto.pasajeros;
      }
    );
  }
  confirmation() {
    swal({
      title: '¿Deseas guardar este reporte en tu dispositivo?',
      text: 'Ocupamos tu memoria, para poder acceder a este reporte más adelante inclusive sin conexión a internet',
      icon: 'info',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal('Tu reporte ha sido guardado', {
          icon: 'success',
        });
        this.saveLocalDB();
      }
    });
  }
  async saveLocalDB() {
    return new Promise(async (resolve, reject) => {
      try {
        const LOCAL_DB = {
          'Ruta': this.Ruta,
          'idviaje': this.idviaje,
          'Bus': this.Bus,
          'Tripulacion': this.Tripulacion,
          'Pasajeros': this.Pasajeros
        };
      } catch (error) {
        throw error;
      }
    });
  }
}
