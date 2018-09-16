import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IndexedDB3Service } from '../../../../services/DB/indexed-db3.service';
import { SystemGiros } from '../../../../models/usuario/SystemGiros.class';
import { CustomersService } from '../../../../services/intranet/customers.service';
import { PartialObserver } from 'rxjs';
import { PdfGeneratorService } from '../../../../services/intranet/pdf-generator.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-sistema-clientes-reporte',
  templateUrl: './sistema-clientes-reporte.component.html',
  styles: []
})
export class SistemaClientesReporteComponent implements OnInit {
  dbCacheKey: number;
  dataOffline: any = '';
  // Propiedades del manifiesto
  isDevice: boolean;
  giros: SystemGiros[] | any = [];
  doc = new jsPDF('p', 'mm', 'a5'); // pdf
  render: boolean = false;
  constructor(private _storage: IndexedDB3Service, private _query: ActivatedRoute,
    private _system: CustomersService, public _pdf: PdfGeneratorService) {
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
    this.dataOffline = await this.createTable();
  }
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
  createTable(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      const CRUD: any = await this.getData();
      if (CRUD.status) {
        const ObjectReport: any = new Array();
        for (const i of CRUD.data) { // Verificamos si es la misma ID de la query
          if (Number(i.id) === Number(this.dbCacheKey)) {
            ObjectReport.push({
              _key: i.id,
              _data: JSON.parse(i.usuario)
            });
          }
        }
        resolve(ObjectReport[0]);
      } else {
        reject(false);
      }
    });
  }
  cargaGiros(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._system.Giros().subscribe(
        (giros: PartialObserver<any> | any): void => {
          this.giros = giros.listado;
          setTimeout((): void => {
            for (const x of this.giros) {
              console.log(x);
              if (x.idgiro === this.dataOffline._data.customer.idgiro) {
                resolve(x);
              }
            }
          }, 500);
        }
      );
    });
  }
    loadPdf() {
      this._pdf.loadPDF(document.getElementById('generateTable1'), this.dataOffline._data.customer.nombrecompleto);
    }
}
