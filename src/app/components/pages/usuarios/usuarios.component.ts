import { Component, OnInit } from '@angular/core';
import { ClientUser } from '../../../models/usuario/cliente.class';
import { CustomersService } from '../../../services/intranet/customers.service';
import { PartialObserver } from 'rxjs';
import { Router } from '@angular/router';
declare function init_plugins();
declare const swal: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  listadoPersonas: ClientUser[] | any =  [];
  constructor(private system_: CustomersService, private _router: Router) {
  }

  ngOnInit() {
    init_plugins();
    this.listarPersonas();
  }
  listarPersonas() {
    this.system_.ListadoPersonas().subscribe(
      (systemCustomers: PartialObserver<any> | any): void => {
        this.listadoPersonas = systemCustomers.listado;
        console.log(this.listadoPersonas);
      }
    );
  }
  listarporRol(keyRol: string) {}
  eliminaPersona(idpersona: number, position: number) {
    this.system_.BorraPersona(new ClientUser(idpersona)).subscribe(
      (cli: PartialObserver<any> | any): void => {
       console.log(cli);
      }
    );
  }
  confirmation(idpersona: number, position: number) {
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
}
