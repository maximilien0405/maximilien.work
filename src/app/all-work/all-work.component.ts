import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { Work } from './../common/work.model'

@Component({
  selector: 'app-all-work',
  templateUrl: './all-work.component.html'
})
export class AllWorkComponent implements OnInit {

  component_all_work: Work[];
  public frameShow:boolean = false;
  imageLink:string = "";
  description:string = "";

  constructor(private projectService: ProjectsService, private router: Router) {
  }

  ngOnInit(): void {
    this.projectService.getAllWork().subscribe((res: Work[]) => {
      this.component_all_work = res;
    });
  }

  displayFrame(img:string, description:string) {
    this.frameShow = true;
    this.imageLink = img;
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
