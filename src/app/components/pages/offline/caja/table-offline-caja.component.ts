import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndexedDB2Service } from '../../../../services/DB/indexed-db2.service';
declare const swal: any;
@Component({
  selector: 'app-table-offline-caja',
  templateUrl: './table-offline-caja.component.html',
  styles: []
})
export class TableOfflineCajaComponent implements OnInit {
  displayTable: any[] = [];
  constructor(private _storage: IndexedDB2Service, private _route: Router) {
   }

  async ngOnInit() {
    this.displayTable = await this.createTable();
  }
  async getData() {
    return new Promise(async (resolve, reject) => {
      try {
        const storage = await this._storage.creaDB('cuadre_caja', 'caja');
        if (storage.status) {
          const GetCajaOffline = await this._storage.getDBStorage('cuadre_caja');
          resolve({
            status: true,
            data: GetCajaOffline
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
        const newTable = new Array();
        for (const td of CRUD.data) {
          newTable.push({
            key: td.id,
            _data: JSON.parse(td.caja)
          });
        }
        resolve(newTable);
      } else {
        reject(false);
      }
    });
  }
  Confirmation(_key: number) {
    swal({
      title: '¿Deseas eliminar este reporte en tu dispositivo?',
      text: 'Eliminaremos este reporte guardado en tu dispositivo, esta acción no se puede deshacer',
      icon: 'warning',
      buttons: true,
      dangerMode: false,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        const rm = await this.DeleteCache(_key);
        console.log(rm);
      }
    });
  }
  DeleteCache(_key: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const db: any = await this.getData();
      let flag = 0;
      for (const rm of db.data) {
        if (Number(rm.id) === (Number(_key))) {
          const itemRemoved = await this._storage.DeleteDB('cuadre_caja', Number(rm.id));
          if (itemRemoved) {
            this.displayTable.splice(flag, 1);
            swal('Confirmación!', 'Tu reporte ha sido eliminado', 'success');
          }
        }
        flag++;
      }
      resolve(true);
    });
  }
  linkOffline(_key: number) {
    this._route.navigate([`/cuadre/offline/caja/report`], {
      queryParams: {
        cache_id: _key
      }
    });
  }
}
