import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntranetService } from './intranet/intranet.service';
import { AuthService } from './auth/auth.service';
import { IndexedDBService } from './DB/indexed-db.service';
@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    IntranetService,
    AuthService,
    IndexedDBService
  ],
  declarations: []
})
export class IntranetModule { }
