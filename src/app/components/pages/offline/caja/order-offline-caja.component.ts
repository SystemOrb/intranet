import { Component, OnInit } from '@angular/core';
import { Caja } from '../../../../models/usuario/caja.class';
import { ItemCredito } from '../../../../models/usuario/credito.class';
import { Resumen } from '../../../../models/usuario/resumen.class';
import { IntranetService } from '../../../../services/intranet/intranet.service';
import { ActivatedRoute } from '@angular/router';
import { IndexedDB2Service } from '../../../../services/DB/indexed-db2.service';
import { PdfGeneratorService } from '../../../../services/intranet/pdf-generator.service';
declare function init_plugins();
@Component({
  selector: 'app-order-offline-caja',
  templateUrl: './order-offline-caja.component.html',
  styles: []
})
export class OrderOfflineCajaComponent implements OnInit {
  date: Date;
  idusuario: string | number;
  Cobranza: Caja[] = [];
  Creditos: ItemCredito[] = [];
  Resumen: Resumen[] = [];
  // Offline
  dbCacheKey: number;
  dataOffline: any;
  constructor(private _intranet: IntranetService,
    private _query: ActivatedRoute, private _storage: IndexedDB2Service,
    private _pdf: PdfGeneratorService) {
      this._query.queryParams.subscribe( (get: any) => {
        this.dbCacheKey = get['cache_id'];
      });
    }

  async ngOnInit() {
    init_plugins();
    this.dataOffline = await this.createTable();
    this.Cobranza = this.dataOffline._data.Cobranza;
    this.Creditos = this.dataOffline._data.Creditos;
    this.Resumen = this.dataOffline._data.Resumen;
    this.idusuario = this.dataOffline._data.idusuario;
    this.date = this.dataOffline._data.date;
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
        const ObjectReport: any = new Array();
        for (const i of CRUD.data) { // Verificamos si es la misma ID de la query
          if (Number(i.id) === Number(this.dbCacheKey)) {
            ObjectReport.push({
              _key: i.id,
              _data: JSON.parse(i.caja)
            });
          }
        }
        resolve(ObjectReport[0]);
      } else {
        reject(false);
      }
    });
  }
  loadPDF() {
    this._pdf.loadPDF(document.getElementById('generateTable1'), `orden-${this.date}`);
  }
}
