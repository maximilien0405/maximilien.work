import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AllWorkComponent } from './all-work/all-work.component';
import { WorkDetailsComponent } from './work-details/work-details.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { EmailSentComponent } from './email-sent/email-sent.component';
import { BlogComponent } from './blog/blog.component';
import { ServicesComponent } from './services/services.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { PayementComponent } from './payement/payement.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'realisations', component: AllWorkComponent },
  { path: 'realisation/:name', component: WorkDetailsComponent },
  { path: 'client-dashboard/:name', component: ClientDashboardComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component:ContactComponent},
  { path: 'contact/success', component: EmailSentComponent },
  { path: 'payement/:id', component: PayementComponent },
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
