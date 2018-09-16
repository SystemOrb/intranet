import { Component, OnInit } from '@angular/core';
import { IntranetService } from '../../../services/intranet/intranet.service';
import { ActivatedRoute } from '@angular/router';
import { Bus } from '../../../models/viajes_programados/bus.class';
import { Pasajeros } from '../../../models/viajes_programados/pasajeros.class';
import { Ruta } from '../../../models/viajes_programados/ruta.class';
import { Tripulacion } from '../../../models/viajes_programados/tripulacion.class';
import { IndexedDBService } from '../../../services/DB/indexed-db.service';
import { PdfGeneratorService } from '../../../services/intranet/pdf-generator.service';
declare const swal: any;
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
  constructor(private _intranet: IntranetService, private _param: ActivatedRoute,
  private _storage: IndexedDBService, private _pdf: PdfGeneratorService) {
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
        // Save on local storage
        const storage = await this._storage.creaDB('manifiesto_pasajeros', 'manifiesto');
         if (storage.status) {
           const insertResult = await this._storage.insertData(JSON.stringify(LOCAL_DB), 'manifiesto_pasajeros', storage._db);
           if (insertResult) {
             swal('Notificación', 'Tu reporte ha sido archivado correctamente', 'success');
             return;
           }
         }
      } catch (error) {
        throw error;
      }
    });
  }
  loadPDF() {
    this._pdf.loadPDF(document.getElementById('generateTable1'), this.idviaje.toString());
  }
}
