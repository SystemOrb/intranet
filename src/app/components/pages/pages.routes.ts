import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ViajesComponent } from './viajes/viajes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PasajerosComponent } from './pasajeros/pasajeros.component';
import { RutasComponent } from './rutas/rutas.component';
import { CajaComponent } from './caja/caja.component';
import { BusComponent } from './bus/bus.component';



const routes: Routes = [
    { path: 'home', component: DashboardComponent, data: {title: 'Pagina de inicio'} },
    { path: 'viajes', component: ViajesComponent, data: {title: 'Viajes'} },
    { path: 'usuarios', component: UsuariosComponent, data: {title: 'Usuarios'} },
    { path: 'pasajeros', component: PasajerosComponent, data: {title: 'Pasajeros'} },
    { path: 'rutas', component: RutasComponent, data: {title: 'Rutas'}},
    { path: 'caja', component: CajaComponent, data: {title: 'Cuadre de caja'} },
    { path: 'bus', component: BusComponent, data: {title: 'Bus'} },
    { path: '', pathMatch: 'full', redirectTo: '/home' }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
