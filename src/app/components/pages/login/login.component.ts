import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginUser } from '../../../models/usuario/login.class';
import {MatSnackBar} from '@angular/material/snack-bar';
declare function init_plugins();
import swal from 'sweetalert';
import { ClientUser } from '../../../models/usuario/cliente.class';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  email: string;
  password: string;
  constructor(private _auth: AuthService,
    private snackBar: MatSnackBar,
    private _route: Router) { }

  ngOnInit() {
    init_plugins();
    this.form = new FormGroup({
      email: new FormControl(this.email, [Validators.required]),
      password: new FormControl(this.password, [Validators.required])
    });
  }
  login() {
    if (!this.form.valid) {
      swal('Alerta!', 'Debes completar todos los campos', 'warning');
      return;
    }
    // Logeamos al usuario
    const loginUser = new LoginUser(this.form.value.email, this.form.value.password);
    this._auth.loginUser(loginUser).subscribe(
      (usuario) => {
        if (!usuario.sucess) {
          this.failed(usuario.message);
        }
        const admin = new ClientUser(
          usuario.listado[0].idpersona,
          usuario.listado[0].tipo,
          usuario.listado[0].nombre,
          usuario.listado[0].nrodoc,
          usuario.listado[0].domlegal,
          usuario.listado[0].roles
        );
        this._auth.saveLocalStorage(admin);
        if (this._auth.logged()) {
          this._route.navigate(['/home']);
        }
        this.failed('Logeado correctamene');
      }
    );
  }
  failed(msg: string) {
    this.snackBar.open(msg, null, {
      duration: 3000
    });
  }
}
