import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntranetService } from './intranet/intranet.service';
import { AuthService } from './auth/auth.service';
import { IndexedDBService } from './DB/indexed-db.service';
import { IndexedDB2Service } from './DB/indexed-db2.service';
import { CustomersService } from './intranet/customers.service';
import { IndexedDB3Service } from './DB/indexed-db3.service';
import { PdfGeneratorService } from './intranet/pdf-generator.service';
import { SidebarService } from './intranet/sidebar.service';
@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    IntranetService,
    AuthService,
    IndexedDBService,
    IndexedDB2Service,
    CustomersService,
    IndexedDB3Service,
    PdfGeneratorService,
    SidebarService
  ],
  declarations: []
})
export class IntranetModule { }
