import { Component, OnInit } from '@angular/core';
import { ClientUser } from '../../../models/usuario/cliente.class';
import { CustomersService } from '../../../services/intranet/customers.service';
import { PartialObserver } from 'rxjs';
import { Router } from '@angular/router';
import { Rol } from '../../../models/usuario/roles.class';
import { SidebarService } from '../../../services/intranet/sidebar.service';
declare const swal: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  listadoPersonas: ClientUser[] | any =  [];
  Roles: Rol[] | any = [];
  constructor(private system_: CustomersService, private _router: Router, public _sidebar: SidebarService) {
    // this._sidebar.DisplaySidebar = false;
  }

  ngOnInit() {
    this.listarPersonas();
    this.cargaRoles();
  }
  listarPersonas() {
    this._sidebar.loader = true;
    this.system_.ListadoPersonas(2).subscribe(
      (systemCustomers: PartialObserver<any> | any): void => {
        this.listadoPersonas = systemCustomers.listado;
        this._sidebar.loader = false;
      }
    );
  }
  eliminaPersona(idpersona: string, position: number) {
    this.system_.BorraPersona(`${idpersona}`).subscribe(
      (cli: PartialObserver<any> | any): void => {
       console.log(cli);
      }
    );
  }
  confirmation(idpersona: string, position: number) {
    swal({
      title: '¿Deseas eliminar a este usuario?',
      text: 'Está seguro? este paso no se puede deshacer',
      icon: 'warning',
      buttons: true,
      dangerMode: false,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.eliminaPersona(idpersona, position);
        swal('Usuario eliminado con éxito', {
          icon: 'success',
        });
      }
    });
  }
  // navigate();
  location(idpersona?: number) {
    this._router.navigate([`crea/usuarios/${idpersona}`]);
  }
  // Roles
  cargaRoles() {
    this.system_.Roles().subscribe(
      (rol: PartialObserver<any> | any): void => {
        this.Roles = rol.listado;
      }
    );
  }
  // Carga tabla buscador dinamico
  loadTable(rol: number) {
    this._sidebar.loader = true;
    this.system_.ListadoPersonas(rol).subscribe(
      (systemCustomers: PartialObserver<any> | any): void => {
        this.listadoPersonas = systemCustomers.listado;
        this._sidebar.loader = false;
      }
    );
  }
}
