import { Component, OnInit } from '@angular/core';
import { Connection } from '../../../models/recursos/connection.class';
import { HTTP_SERVICE } from '../../../services/services.config';
import { SidebarService } from '../../../services/intranet/sidebar.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  Connection: Connection;
  displayMenu: boolean;
  public isDevice: boolean;
  url = `${HTTP_SERVICE}listadorutas.php`;
  constructor(public _sidebar: SidebarService) {
    const isMobile = navigator.userAgent.match(
      /(iPhone|iPod|iPad|Android|webOS|BlackBerry|IEMobile|Opera Mini)/i);
    if (isMobile === null || (!isMobile)) {
      this.isDevice = false;
      console.log('desktop');
    } else {
      this.isDevice = true;
      console.log('telefono');
    }
  }

  async ngOnInit() {
    const connection = await this.VerifyConnection();
    this.displayMenu = connection.connection;
  }
  // Verificamos la conexión
  VerifyConnection(): Promise<Connection> {
    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      xhr.onload = (): void => {
        resolve(new Connection(true));
      };
      xhr.onerror = (): void => {
        resolve(new Connection(false));
      };
      xhr.open('GET', this.url, true);
      xhr.send();
     });
  }
}
