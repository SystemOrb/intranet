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
import { OrderManifiestoComponent } from './pasajeros/order-manifiesto.component';
import { TableOfflineComponent } from './offline/manifiesto/table-offline.component';
import { OrderManifiestoOfflineComponent } from './offline/manifiesto/order-manifiesto-offline.component';
import { TableOfflineCajaComponent } from './offline/caja/table-offline-caja.component';
import { OrderOfflineCajaComponent } from './offline/caja/order-offline-caja.component';
import { CreaUsuarioComponent } from './usuarios/crea-usuario.component';
import { SistemaClientesComponent } from './offline/sistema-clientes/sistema-clientes.component';
import { SistemaClientesReporteComponent } from './offline/sistema-clientes/sistema-clientes-reporte.component';
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
    OrdenComponent,
    OrderManifiestoComponent,
    TableOfflineComponent,
    OrderManifiestoOfflineComponent,
    TableOfflineCajaComponent,
    OrderOfflineCajaComponent,
    SistemaClientesComponent,
    SistemaClientesReporteComponent,
    CreaUsuarioComponent
  ]
})
export class PagesModule { }
