import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllWorkComponent } from './all-work/all-work.component';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { WorkDetailsComponent } from './work-details/work-details.component';
import { provideTranslateService, TranslateDirective, TranslatePipe } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { ContactComponent } from './contact/contact.component';
import { EmailSentComponent } from './email-sent/email-sent.component';
import { BlogComponent } from './blog/blog.component';
import { ServicesComponent } from './services/services.component';
import { MarkdownModule } from "ngx-markdown";
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';
import { PayementComponent } from './payement/payement.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
registerLocaleData(localeEn);
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AllWorkComponent,
    WorkDetailsComponent,
    ContactComponent,
    EmailSentComponent,
    BlogComponent,
    ServicesComponent,
    ClientDashboardComponent,
    PayementComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    MarkdownModule.forRoot(),
    TranslatePipe,
    TranslateDirective,
  ],
  providers: [
    provideHttpClient(withXhr(), withInterceptorsFromDi()),
    provideTranslateService({
      fallbackLang: 'fr',
    }),
    ...provideTranslateHttpLoader({
      prefix: './assets/i18n/',
      suffix: '.json',
    }),
  ]
})
export class AppModule { }
