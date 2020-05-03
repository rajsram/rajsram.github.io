import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxMaterialTimepickerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
