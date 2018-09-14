import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViajesComponent } from './viajes/viajes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PasajerosComponent } from './pasajeros/pasajeros.component';
import { RutasComponent } from './rutas/rutas.component';
import { CajaComponent } from './caja/caja.component';
import { BusComponent } from './bus/bus.component';
import { OrdenComponent } from './caja/orden.component';
import { OrderManifiestoComponent } from './pasajeros/order-manifiesto.component';
import { TableOfflineComponent } from './offline/manifiesto/table-offline.component';
import { OrderManifiestoOfflineComponent } from './offline/manifiesto/order-manifiesto-offline.component';
import { TableOfflineCajaComponent } from './offline/caja/table-offline-caja.component';
import { OrderOfflineCajaComponent } from './offline/caja/order-offline-caja.component';
import { CreaUsuarioComponent } from './usuarios/crea-usuario.component';
import { SistemaClientesComponent } from './offline/sistema-clientes/sistema-clientes.component';
import { SistemaClientesReporteComponent } from './offline/sistema-clientes/sistema-clientes-reporte.component';



const routes: Routes = [
    { path: 'home', component: DashboardComponent, data: {title: 'Pagina de inicio'} },
    { path: 'viajes', component: ViajesComponent, data: {title: 'Viajes'} },
    { path: 'usuarios', component: UsuariosComponent, data: {title: 'Usuarios'} },
    { path: 'crea/usuarios/:keyUser', component: CreaUsuarioComponent, data: {title: 'Administración de usuarios'} },
    { path: 'pasajeros', component: PasajerosComponent, data: {title: 'Manifiesto de Pasajeros'} },
    { path: 'manifiesto/pasajeros/:idviaje', component: OrderManifiestoComponent, data: {title: 'Manifiesto de Pasajeros'} },
    { path: 'manifiesto/offline/pasajeros', component: TableOfflineComponent, data: {title: 'Manifiestos guardados'} },
    { path: 'manifiesto/offline/pasajeros/report', component: OrderManifiestoOfflineComponent, data: {title: 'Manifiestos guardados'} },
    { path: 'cuadre/offline/caja', component: TableOfflineCajaComponent, data: {title: 'Cuadre de caja'} },
    { path: 'cuadre/offline/caja/report', component: OrderOfflineCajaComponent, data: {title: 'Cuadre de caja'} },
    { path: 'system/offline/usuarios', component: SistemaClientesComponent, data: {title: 'Clientes Guardados'} },
    { path: 'system/offline/usuarios/report', component: SistemaClientesReporteComponent, data: {title: 'Datos del Usuario'} },
    { path: 'rutas', component: RutasComponent, data: {title: 'Rutas'}},
    { path: 'caja', component: CajaComponent, data: {title: 'Cuadre de caja'} },
    { path: 'orden_caja/:id/:date', component: OrdenComponent, data: {title: 'Cuadre de caja'} },
    { path: 'bus', component: BusComponent, data: {title: 'Bus'} },
    { path: '', pathMatch: 'full', redirectTo: '/home' }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
