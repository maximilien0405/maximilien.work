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
  
  constructor(private projectService: ProjectsService) {
  }

  ngOnInit(): void {
    this.projectService.getAllWork().subscribe((res: Work[]) => {
      this.component_all_work = res;
    });
  }

  public frameShow:boolean = false;
  imageLink:string = "";
  description:string = "";

  displayFrame(img:string, description:string) {
    this.frameShow = true;
    this.imageLink = img;
    this.description = description;
  }

  hide() {
    this.frameShow = false
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event:
    KeyboardEvent) {
      this.hide()
  }

  all_work: Work[];
}
