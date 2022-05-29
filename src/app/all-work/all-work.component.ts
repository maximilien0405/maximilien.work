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

  public component_free_work: Work[];
  public component_all_work: Work[] = [];
  public component_daily_work: Work[];

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
    this.component_free_work = [...this.component_free_work];
    this.component_all_work = [...this.component_all_work];
    this.component_daily_work = [...this.component_daily_work];
  }

  public ngOnInit(): void {
    this.projectService.getFreeWork().subscribe((res: Work[]) => {
      this.component_free_work = res;
    });

    this.projectService.getDailyWork().subscribe((res: Work[]) => {
      this.component_daily_work = res;
    });

    this.projectService.getFreeWork().subscribe((res: Work[]) => {
      for (let index = 0; index < res.length; index++) {
        this.component_all_work.push(res[index]);
      }

      this.projectService.getDailyWork().subscribe((res: Work[]) => {
        for (let index = 0; index < res.length; index++) {
          this.component_all_work.push(res[index]);
        }
      });
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
