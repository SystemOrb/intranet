import { Component, OnInit } from '@angular/core';
import { Connection } from '../../../models/recursos/connection.class';
import { HTTP_SERVICE } from '../../../services/services.config';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  Connection: Connection;
  displayMenu: boolean;
  url = `${HTTP_SERVICE}listadorutas.php`;
  constructor() {
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
