import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public DisplaySidebar: boolean = false; // Para manipular el menu en toda la aplicación
  constructor() { }
}
