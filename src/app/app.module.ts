import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiV1Interceptor } from './interceptors/api-v1.interceptor';

import { AppComponent } from './app.component';

import { AllMaterialModule } from './all-material/all-material.module';
import { ComponentsModule } from './components/components.module';
import { ServicesModule } from './services/services.module';

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
    ServicesModule,
    ComponentsModule,
    RouterModule.forRoot(pkoRoutes, { enableTracing: true })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiV1Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
