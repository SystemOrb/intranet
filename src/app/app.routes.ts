import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';
import { PagesComponent } from './components/pages/pages.component';
import { LoginComponent } from './components/pages/login/login.component';

const routes: Routes = [
    { path: '', component: PagesComponent,
    loadChildren: './components/pages/pages.module#PagesModule' },
    { path: 'login', component: LoginComponent },
    { path: '**', component: NotfoundComponent },
];

export const APP_ROUTES = RouterModule.forRoot( routes, {useHash: true} );

