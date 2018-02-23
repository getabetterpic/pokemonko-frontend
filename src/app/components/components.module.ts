import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';

import { AllMaterialModule } from '../all-material/all-material.module';
import { ComponentsRoutingModule } from './components-routing.module';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';

import { CardListComponent } from './card-list/card-list.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { CallbackComponent } from './callback/callback.component';

@NgModule({
  imports: [
    CommonModule,
    AllMaterialModule,
    ComponentsRoutingModule,
    FormsModule
  ],
  declarations: [
    NavbarComponent,
    SearchFormComponent,
    CardListComponent,
    CallbackComponent
  ],
  exports: [
    NavbarComponent,
    SearchFormComponent
  ],
  providers: [
    BreakpointObserver,
    MediaMatcher
  ]
})
export class ComponentsModule { }
