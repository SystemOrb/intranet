import { Component, OnInit } from '@angular/core';
import { IntranetService } from '../../../services/intranet/intranet.service';
import { ActivatedRoute } from '@angular/router';
import { Caja } from '../../../models/usuario/caja.class';
import { ItemCredito } from '../../../models/usuario/credito.class';
import { Resumen } from '../../../models/usuario/resumen.class';
import { IndexedDB2Service } from '../../../services/DB/indexed-db2.service';
import { PdfGeneratorService } from '../../../services/intranet/pdf-generator.service';
declare const swal: any;
@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styles: []
})
export class OrdenComponent implements OnInit {
  date: Date;
  idusuario: string | number;
  Cobranza: Caja[] = [];
  Creditos: ItemCredito[] = [];
  Resumen: Resumen[] = [];
  constructor(private _intranet: IntranetService,
     private _get: ActivatedRoute, private _storage: IndexedDB2Service,
     private _pdf: PdfGeneratorService) {
        this._get.params.subscribe(
          (cuadreParametros: any) => {
            this.idusuario = cuadreParametros['id'];
            this.date = cuadreParametros['date'];
          }
        );
     }

  ngOnInit() {
    this.cuadreCajaUsuario();
  }
  cuadreCajaUsuario() {
    this._intranet.CuadreCaja(this.idusuario, this.date).subscribe(
      (caja: any) => {
        this.Cobranza = caja.cobranzas;
        this.Creditos = caja.itemcredito;
        this.Resumen = caja.resumen;
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
  saveLocalDB() {
    return new Promise(async (resolve, reject) => {
      try {
        const LOCAL_DB = {
          'Cobranza': this.Cobranza,
          'Creditos': this.Creditos,
          'Resumen': this.Resumen,
          'idusuario': this.idusuario,
          'date': this.date
        };
        // Save o localstorage
        const storage = await this._storage.creaDB('cuadre_caja', 'caja');
        if (storage.status) {
          const insertResult = await this._storage.insertData(JSON.stringify(LOCAL_DB), 'cuadre_caja', storage._db);
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
    this._pdf.loadPDF(document.getElementById('generateTable1'), `orden-${this.date}`);
  }
}
