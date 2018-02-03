import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { SearchFormComponent } from './search-form/search-form.component';

const componentsRoutes: Routes = [
  { path: 'search', component: SearchFormComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(componentsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ComponentsRoutingModule { }
