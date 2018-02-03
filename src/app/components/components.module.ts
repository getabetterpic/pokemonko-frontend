import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

import { SearchFormComponent } from './search-form/search-form.component';

import { AllMaterialModule } from '../all-material/all-material.module';
import { ComponentsRoutingModule } from './components-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AllMaterialModule,
    ComponentsRoutingModule
  ],
  declarations: [
    NavbarComponent,
    SearchFormComponent
  ],
  exports: [
    NavbarComponent,
    SearchFormComponent
  ]
})
export class ComponentsModule { }
