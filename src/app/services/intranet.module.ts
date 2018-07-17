import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntranetService } from './intranet/intranet.service';
import { AuthService } from './auth/auth.service';
@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    IntranetService,
    AuthService
  ],
  declarations: []
})
export class IntranetModule { }
