import { Component, OnInit } from '@angular/core';
import { IndexedDBService } from '../../../../services/DB/indexed-db.service';
import { Router } from '@angular/router';
declare function init_plugins();

@Component({
  selector: 'app-table-offline',
  templateUrl: './table-offline.component.html',
  styles: []
})
export class TableOfflineComponent implements OnInit {
  displayTable: any[] = [];
  constructor(private _storage: IndexedDBService, private _route: Router) {
    init_plugins();
  }
  async ngOnInit() {
    this.displayTable = await this.createTable();
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
}
