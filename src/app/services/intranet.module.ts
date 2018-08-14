import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntranetService } from './intranet/intranet.service';
import { AuthService } from './auth/auth.service';
import { IndexedDBService } from './DB/indexed-db.service';
import { IndexedDB2Service } from './DB/indexed-db2.service';
@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    IntranetService,
    AuthService,
    IndexedDBService,
    IndexedDB2Service
  ],
  declarations: []
})
export class IntranetModule { }
