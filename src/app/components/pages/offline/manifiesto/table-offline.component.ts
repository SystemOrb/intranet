import { Component, OnInit } from '@angular/core';
import { IndexedDBService } from '../../../../services/DB/indexed-db.service';
import { Router } from '@angular/router';
import { SidebarService } from '../../../../services/intranet/sidebar.service';
declare const swal: any;
@Component({
  selector: 'app-table-offline',
  templateUrl: './table-offline.component.html',
  styles: []
})
export class TableOfflineComponent implements OnInit {
  displayTable: any[] = [];
  constructor(private _storage: IndexedDBService, private _route: Router,
    private _sidebar: SidebarService) {
    // this._sidebar.DisplaySidebar = false;
  }
  async ngOnInit() {
    this.displayTable = await this.createTable();
  }
  async getData() {
    return new Promise(async (resolve, reject) => {
      try {
        const storage = await this._storage.creaDB('manifiesto_pasajeros', 'manifiesto');
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
        const newTable = new Array();
        for (const td of CRUD.data) {
          newTable.push({
            key: td.id,
            _data: JSON.parse(td.manifiesto)
          });
        }
        resolve(newTable);
      } else {
        reject(false);
      }
    });
  }
  linkOffline(_key: number) {
    this._route.navigate([`/manifiesto/offline/pasajeros/report`], {
      queryParams: {
        cache_id: _key
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
          const itemRemoved = await this._storage.DeleteDB('manifiesto_pasajeros', Number(rm.id));
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
}
