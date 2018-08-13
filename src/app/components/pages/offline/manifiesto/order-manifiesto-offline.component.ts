import { Component, OnInit } from '@angular/core';
import { IndexedDBService } from '../../../../services/DB/indexed-db.service';
import { ActivatedRoute } from '@angular/router';
import { Pasajeros } from '../../../../models/viajes_programados/pasajeros.class';
import { Bus } from '../../../../models/viajes_programados/bus.class';
import { Ruta } from '../../../../models/viajes_programados/ruta.class';
import { Tripulacion } from '../../../../models/viajes_programados/tripulacion.class';
declare function init_plugins();
@Component({
  selector: 'app-order-manifiesto-offline',
  templateUrl: './order-manifiesto-offline.component.html',
  styles: []
})
export class OrderManifiestoOfflineComponent implements OnInit {
  dbCacheKey: number;
  dataOffline: any;
  // Propiedades del manifiesto
  idviaje: string | number;
  Bus: Bus;
  Pasajeros: Pasajeros[] = [];
  Ruta: Ruta;
  Tripulacion: Tripulacion;
  isDevice: boolean;
  constructor(private _storage: IndexedDBService, private _query: ActivatedRoute) {
    this._query.queryParams.subscribe( (get: any) => {
      this.dbCacheKey = get['cache_id'];
      const isMobile = navigator.userAgent.match(
        /(iPhone|iPod|iPad|Android|webOS|BlackBerry|IEMobile|Opera Mini)/i);
      if (isMobile === null || (!isMobile)) {
        this.isDevice = false;
      } else {
        this.isDevice = true;
      }
    });
  }

  async ngOnInit() {
    init_plugins();
    this.dataOffline = await this.createTable();
    this.Bus = this.dataOffline._data.Bus;
    this.idviaje = this.dataOffline._data.idviaje;
    this.Ruta = this.dataOffline._data.Ruta;
    this.Tripulacion = this.dataOffline._data.Tripulacion;
    this.Pasajeros = this.dataOffline._data.Pasajeros;
  }
  async getData() {
    return new Promise(async (resolve, reject) => {
      try {
        const storage = await this._storage.creaDB('manifiesto_pasajeros');
        if (storage.status) {
          const GetManifiestoOffline = await this._storage.getDBStorage('manifiesto_pasajeros');
          resolve({
            status: true,
            data: GetManifiestoOffline
          });
        } else {
          throw new Error('Hubo un error al intentar acceder a la base de datos offline' + storage);
        }
      } catch (error) {
        throw error;
      }
    });
  }
  createTable(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      const CRUD: any = await this.getData();
      if (CRUD.status) {
        const ObjectReport: any = new Array();
        for (const i of CRUD.data) { // Verificamos si es la misma ID de la query
          if (Number(i.id) === Number(this.dbCacheKey)) {
            ObjectReport.push({
              _key: i.id,
              _data: JSON.parse(i.manifiesto)
            });
          }
        }
        resolve(ObjectReport[0]);
      } else {
        reject(false);
      }
    });
  }

}
