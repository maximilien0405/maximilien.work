import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllWorkComponent } from './all-work/all-work.component';
import { AppComponent } from './app.component';
import { WorkDetailsComponent } from './work-details/work-details.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { EmailSentComponent } from './email-sent/email-sent.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'projets', component: AllWorkComponent },
  { path: 'projet/:name', component: WorkDetailsComponent},
  { path: 'contact', component:ContactComponent},
  { path: 'contact/success', component: EmailSentComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
