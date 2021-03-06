import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AllWorkComponent } from './all-work/all-work.component';
import { AppComponent } from './app.component';
import { WorkDetailsComponent } from './work-details/work-details.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { EmailSentComponent } from './email-sent/email-sent.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'realisations', component: AllWorkComponent },
  { path: 'realisation/:name', component: WorkDetailsComponent},
  { path: 'contact', component:ContactComponent},
  { path: 'contact/success', component: EmailSentComponent },
  { path: '**', redirectTo: '/' }
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
