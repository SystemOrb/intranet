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
@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
  ],
  declarations: [
    BusComponent,
    CajaComponent,
    PasajerosComponent,
    RutasComponent,
    UsuariosComponent,
    ViajesComponent,
    DashboardComponent
  ]
})
export class PagesModule { }
