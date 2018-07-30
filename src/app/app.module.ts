import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';
import { PagesComponent } from './components/pages/pages.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';
import { LoginComponent } from './components/pages/login/login.component';
import { IntranetModule } from './services/intranet.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthorizedGuard } from './GUARDS/authorized.guard';
import {ServiceWorkerModule} from '@angular/service-worker';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    NotfoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    RouterModule,
    IntranetModule,
    APP_ROUTES,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : []
  ],
  providers: [
    AuthorizedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
