import { Component, OnInit } from '@angular/core';
import { IntranetService } from '../../../services/intranet/intranet.service';
import { ClientUser } from '../../../models/usuario/cliente.class';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { SidebarService } from '../../../services/intranet/sidebar.service';
import * as moment from 'moment';
@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styles: []
})
export class CajaComponent implements OnInit {
  dateSearch: Date;
  trabajadores: ClientUser[] = [];
  notData: boolean;
  constructor(public intranet: IntranetService, private _route: Router,
    private _sidebar: SidebarService) {
    this.dateSearch = intranet.searchDate;
    this._sidebar.DisplaySidebar = false;
  }

  ngOnInit() {
    this.tablaUsuariosTrajabores();
  }
  async tablaUsuariosTrajabores() {
    const listado = await this.CargaUsuariosTrabajadores();
    if (listado === null) {
      this.notData = true;
    } else {
      this.trabajadores = listado;
      this.notData = false;
    }
  }

   CargaUsuariosTrabajadores(): Promise<ClientUser[] | any> {
    return new Promise( (resolve, reject) => {
      this.intranet.listadoTrabajadores(3, '').subscribe(
        (listado: any) => {
          if (!listado.listado) {
            resolve(null);
            return;
          }
          const trabajadores: ClientUser[] = new Array();
          for (const worker of listado.listado) {
            trabajadores.push({
              'idpersona': worker.idpersona,
              'tipo': worker.tipo,
              'nombre': worker.nombre,
              'nrodoc': worker.nrodoc,
              'domlegal': worker.domlegal,
              'roles': worker.roles
            });
          }
           resolve(trabajadores);
        }
      );
    });
  }
  componentChildren(id_user: string | number, date: Date) {
    if (!date) {
      swal('Error de sistema', 'Debes elegir una busqueda por fecha', 'error');
      return;
    }
     this._route.navigate(['/orden_caja', id_user, moment(date).format('DD-MM-YYYY')]);
  }
}
