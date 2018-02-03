import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { AllMaterialModule } from './all-material/all-material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
    AllMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
