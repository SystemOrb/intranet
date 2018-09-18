import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ClientUser } from '../../../models/usuario/cliente.class';
import { SidebarService } from '../../../services/intranet/sidebar.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userData: ClientUser;
  isDevice: boolean;
  constructor(private _auth: AuthService, private _router: Router,
    public _sidebar: SidebarService) {
    this.userData = _auth.adminUser;
   }

  ngOnInit() {
    const isMobile = navigator.userAgent.match(
      /(iPhone|iPod|iPad|Android|webOS|BlackBerry|IEMobile|Opera Mini)/i);
    if (isMobile === null || (!isMobile)) {
      this.isDevice = false;
    } else {
      this.isDevice = true;
      $('body').addClass('show-sidebar');
    }
  }
  logout() {
    this._auth.logout();
    this._router.navigate(['/login']);
  }
  displaySidebar() {
    if (this._sidebar.DisplaySidebar) {
      this._sidebar.DisplaySidebar = false;
      if (this.isDevice) {
        $('#asideMobile').css('display', 'block');
      }
    } else {
      this._sidebar.DisplaySidebar = true;
      if (this.isDevice) {
        $('#asideMobile').css('display', 'none');
      }
    }
    /*if (this._sidebar.DisplaySidebar) {
      this._sidebar.DisplaySidebar = false;
      $('body').removeClass('show-sidebar');
      if (this.isDevice) {
        $('#asideMobile').addClass('hide-sidebar');
      }
    } else {
      this._sidebar.DisplaySidebar = true;
      $('body').toggleClass('show-sidebar');
      if (this.isDevice) {
        $('#asideMobile').addClass('show-sidebar');
      }
    }*/
  }
}
