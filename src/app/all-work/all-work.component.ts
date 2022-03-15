import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProjectsService } from '../projects.service';
import { Work } from './../common/work.model'

@Component({
  selector: 'app-all-work',
  templateUrl: './all-work.component.html'
})
export class AllWorkComponent implements OnInit {

  public component_all_work: Work[];
  public frameShow:boolean = false;
  public imageLink:string = "";
  public description:string = "";
  public lang = this.translate.currentLang

  constructor(private projectService: ProjectsService, private router: Router, private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.projectService.getAllWork().subscribe((res: Work[]) => {
      this.component_all_work = res;
    });
  }

  displayFrame(img_preview:string, description:string) {
    this.frameShow = true;
    this.imageLink = img_preview;
    this.description = description;
  }

  hide() {
    this.frameShow = false
  }

  all_work: Work[];

  join(url:any):void {
    this.router.navigateByUrl("/projet/" + url);
  }
}
