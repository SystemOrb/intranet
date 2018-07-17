import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ClientUser } from '../../../models/usuario/cliente.class';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  userData: ClientUser;
  constructor(private _auth: AuthService, private _router: Router) {
    this.userData = _auth.adminUser;
   }

  ngOnInit() {
  }
  logout() {
    this._auth.logout();
    this._router.navigate(['/login']);
  }

}
