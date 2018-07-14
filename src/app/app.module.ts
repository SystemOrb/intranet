import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';
import { PagesComponent } from './components/pages/pages.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';
import { LoginComponent } from './components/pages/login/login.component';

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
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
