import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxGlideModule } from 'ngx-glide';
import { AllWorkComponent } from './all-work/all-work.component';
import { HttpClientModule } from '@angular/common/http';
import { WorkDetailsComponent } from './work-details/work-details.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AllWorkComponent,
    WorkDetailsComponent,
  ],
  imports: [
    BrowserModule,
    NgxGlideModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
