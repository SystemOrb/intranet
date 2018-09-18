import { Component, OnInit } from '@angular/core';
import { IndexedDB3Service } from '../../../../services/DB/indexed-db3.service';
import { Router } from '@angular/router';
import { SidebarService } from '../../../../services/intranet/sidebar.service';
declare const swal: any;
@Component({
  selector: 'app-sistema-clientes',
  templateUrl: './sistema-clientes.component.html',
  styles: []
})
export class SistemaClientesComponent implements OnInit {
  displayTable: any[] = [];
  constructor(private _storage: IndexedDB3Service, private _route: Router,
    private _sidebar: SidebarService) {
      // this._sidebar.DisplaySidebar = false;
     }

  async ngOnInit() {
    this.displayTable = await this.createTable();
  }
  // Buscamos si hay data en la base de datos del cache
  async getData(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const storage = await this._storage.creaDB('cuadre_usuarios', 'usuario');
        if (storage.status) {
          const GetManifiestoOffline = await this._storage.getDBStorage('cuadre_usuarios');
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
  // Creamos una tabla
  createTable(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      const CRUD: any = await this.getData();
      if (CRUD.status) {
        const newTable = new Array();
        for (const td of CRUD.data) {
          newTable.push({
            key: td.id,
            _data: JSON.parse(td.usuario)
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
  // Removemos del cache
  DeleteCache(_key: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const db: any = await this.getData();
      let flag = 0;
      for (const rm of db.data) {
        if (Number(rm.id) === (Number(_key))) {
          const itemRemoved = await this._storage.DeleteDB('cuadre_usuarios', Number(rm.id));
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
    this._route.navigate([`/system/offline/usuarios/report`], {
      queryParams: {
        cache_id: _key
      }
    });
  }
}
