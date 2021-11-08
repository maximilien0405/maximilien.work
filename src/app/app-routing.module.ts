import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllWorkComponent } from './all-work/all-work.component';
import { AppComponent } from './app.component';
import { WorkDetailsComponent } from './work-details/work-details.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'projets', component: AllWorkComponent },
  { path: 'projet/:name', component: WorkDetailsComponent},
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
