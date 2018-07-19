import { Component, OnInit } from '@angular/core';
import { IntranetService } from '../../../services/intranet/intranet.service';
import { ActivatedRoute } from '@angular/router';
import { Caja } from '../../../models/usuario/caja.class';
import { ItemCredito } from '../../../models/usuario/credito.class';
declare function init_plugins();
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
  constructor(private _intranet: IntranetService,
     private _get: ActivatedRoute) {
        this._get.params.subscribe(
          (cuadreParametros: any) => {
            this.idusuario = cuadreParametros['id'];
            this.date = cuadreParametros['date'];
          }
        );
     }

  ngOnInit() {
    init_plugins();
    this.cuadreCajaUsuario();
  }
  cuadreCajaUsuario() {
    this._intranet.CuadreCaja(this.idusuario, this.date).subscribe(
      (caja: any) => {
        this.Cobranza = caja.cobranzas;
        this.Creditos = caja.itemcredito;
      }
    );
  }
}
