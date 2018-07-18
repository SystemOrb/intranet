import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusComponent } from './bus/bus.component';
import { CajaComponent } from './caja/caja.component';
import { PasajerosComponent } from './pasajeros/pasajeros.component';
import { RutasComponent } from './rutas/rutas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ViajesComponent } from './viajes/viajes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesRoutingModule } from './pages.routes';
import { FormsModule } from '@angular/forms';
import { OrdenComponent } from './caja/orden.component';
@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule
  ],
  declarations: [
    BusComponent,
    CajaComponent,
    PasajerosComponent,
    RutasComponent,
    UsuariosComponent,
    ViajesComponent,
    DashboardComponent,
    OrdenComponent
  ]
})
export class PagesModule { }
