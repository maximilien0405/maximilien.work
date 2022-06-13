import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ProjectsService } from '../projects.service';
import { Work } from '../../common/work.model'

@Component({
  selector: 'app-all-work',
  templateUrl: './all-work.component.html'
})
export class AllWorkComponent implements OnInit {

  public component_project_work: Work[];
  public component_other_work: Work[];

  public frameShow:boolean = false;
  public imageLink:string = "";
  public description:string = "";
  public lang = this.translate.currentLang;
  public type:number = 1;

  constructor(private projectService: ProjectsService, private router: Router, private translate: TranslateService) {
    this.translate.onLangChange
    .subscribe((event: LangChangeEvent) => {
      this.lang = event.lang
      this.reloadData()
    });
  }

  public reloadData():void {
    this.component_project_work = [...this.component_project_work];
    this.component_other_work = [...this.component_other_work];
  }

  public ngOnInit(): void {
    this.projectService.getProjectWork().subscribe((res: Work[]) => {
      this.component_project_work = res;
    });

    this.projectService.getOtherWork().subscribe((res: Work[]) => {
      this.component_other_work = res;
    });
  }

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
    this.reloadData()
  }
}
