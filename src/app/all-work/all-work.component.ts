import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-all-work',
  templateUrl: './all-work.component.html'
})
export class AllWorkComponent implements OnInit {

  public component_all_work = [];

  public frameShow:boolean = false;
  public imageLink:string = "";
  public description:string = "";
  public lang = localStorage.getItem('lang')
  
  public type:number = 1;

  constructor(private projectService: ProjectsService, private router: Router, private translate: TranslateService) {
    this.translate.onLangChange
    .subscribe((event: LangChangeEvent) => {
      this.lang = event.lang
    });
        
    console.log("test")

  }

  // public reloadData():void {
  //   this.component_project_work = [...this.component_project_work];
  //   this.component_other_work = [...this.component_other_work];
  // }

  public ngOnInit(): void {

    this.projectService.getAllWork(this.lang).subscribe((res:any) => {
      this.component_all_work = res;
    });

    console.log(this.component_all_work)
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
   // this.reloadData()
  }
}
