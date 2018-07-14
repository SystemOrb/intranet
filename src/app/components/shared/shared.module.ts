import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent
  ]
})
export class SharedModule { }
