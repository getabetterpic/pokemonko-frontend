import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './auth.service';
import { Auth0Service } from './auth0.service';
import { CardService } from './card.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    Auth0Service,
    CardService
  ],
  declarations: []
})
export class ServicesModule { }
