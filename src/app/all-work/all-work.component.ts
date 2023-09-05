import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { ProjectsService } from '../common/services/projects.service';

@Component({
  selector: 'app-all-work',
  templateUrl: './all-work.component.html'
})
export class AllWorkComponent {
  public all_work:any;
  public total_all_personnal:any = [];
  public total_all_other: any = [];
  public total_all_freelance: any = [];

  public total_selected_work: any = [];
  public lang = localStorage.getItem('lang')
  public readonly API_URL = environment.api;

  constructor(private projectService:ProjectsService,
    private router: Router,
    private translate: TranslateService) {

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang
    });

    // Get all work and divide in category
    this.projectService.getAllWork(this.lang).subscribe(res => {
      this.all_work = res.data;

      for (let x in this.all_work) {
        if (this.all_work[x].attributes.category == 'personnal') {
          this.total_all_personnal.push(this.all_work[x].attributes)
        } else if (this.all_work[x].attributes.category == 'other'){
          this.total_all_other.push(this.all_work[x].attributes)
        } else if (this.all_work[x].attributes.category == 'freelance') {
          this.total_all_freelance.push(this.all_work[x].attributes)
        }
      }

      this.total_selected_work = this.total_all_personnal;
    });
  }

  // Join a specific work
  public join(url:any):void {
    this.router.navigateByUrl("/realisation/" + url);
  }

  // Change the type
  public changeType(type: string): void {
    if (type == 'personnal') {
      this.total_selected_work = this.total_all_personnal;
    } else if (type == 'other') {
      this.total_selected_work = this.total_all_other;
    } else if (type = 'freelance') {
      this.total_selected_work = this.total_all_freelance;
    }
  }
}
