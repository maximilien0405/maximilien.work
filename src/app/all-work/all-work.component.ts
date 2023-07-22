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
  public total_all_work:any = [];
  public total_all_other:any = [];
  public lang = localStorage.getItem('lang')
  public readonly API_URL = environment.api;
  public type:number = 1;

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
        if(this.all_work[x].attributes.type == 'project') {
          this.total_all_work.push(this.all_work[x].attributes)
        } else if(this.all_work[x].attributes.type == 'other'){
          this.total_all_other.push(this.all_work[x].attributes)
        }
      }
    });
  }

  // Join a specific work
  public join(url:any):void {
    this.router.navigateByUrl("/realisation/" + url);
  }

  // Change the type
  public changeType(type:number):void {
    this.type = type;
  }
}
