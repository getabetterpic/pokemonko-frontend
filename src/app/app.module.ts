import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { AllMaterialModule } from './all-material/all-material.module';
import { ComponentsModule } from './components/components.module';

import { SearchFormComponent } from './components/search-form/search-form.component';

const pkoRoutes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AllMaterialModule,
    ComponentsModule,
    RouterModule.forRoot(pkoRoutes, { enableTracing: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
