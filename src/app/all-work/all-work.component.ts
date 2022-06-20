import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-all-work',
  templateUrl: './all-work.component.html'
})
export class AllWorkComponent implements OnInit {

  public all_work:any;
  public total_all_work:any = [];
  public total_all_other:any = [];

  public frameShow:boolean = false;
  public imageLink:string = "";
  public description:string = "";
  public lang = localStorage.getItem('lang')
  public readonly API_URL = environment.api;

  public type:number = 1;

  constructor(private projectService:ProjectsService, private router: Router, private translate: TranslateService) {
    this.translate.onLangChange
    .subscribe((event: LangChangeEvent) => {
      this.lang = event.lang
    });
      
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

  public ngOnInit(): void {}

  public displayFrame(img_preview:string, description:string):void {
    this.frameShow = true;
    this.imageLink = img_preview;
    this.description = description;
  }

  public hide():void {
    this.frameShow = false
  }

  public join(url:any):void {
    this.router.navigateByUrl("/realisation/" + url);
  }

  public changeType(type:number):void {
    this.type = type;
  }
}
