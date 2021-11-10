import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Work } from '../common/work.model';
import { ProjectsService } from '../projects.service';
import { Router } from '@angular/router';
import { NgxGlideComponent } from 'ngx-glide';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  component_home_work: Work[];
  public frameShow:boolean = false;
  imageLink:string = "";
  description:string = "";

  constructor(private projectService: ProjectsService, private router: Router) {
  }

  // Get the component instance.
  @ViewChild(NgxGlideComponent, { static: false }) ngxGlide: NgxGlideComponent;

  @ViewChild(NgxGlideComponent, { static: false }) ngxGlide2: NgxGlideComponent;


  ngOnInit(): void {
    this.projectService.getHomeWork().subscribe((res: Work[]) => {
      this.component_home_work = res;
    });

    this.ngxGlide.gap = 20;
    this.ngxGlide.perView = 2;
    this.ngxGlide.showArrows = false;
    this.ngxGlide.showBullets = false;

    this.ngxGlide2.gap = 20;
    this.ngxGlide2.perView = 1;
    this.ngxGlide2.showArrows = false;
    this.ngxGlide2.showBullets = false;
  }

  next(): void {
    this.ngxGlide.go('>');
    this.ngxGlide2.go('>');
  }

  back(): void {
    this.ngxGlide.go('<');
    this.ngxGlide2.go('<');
  }

  displayFrame(img:string, description:string) {
    this.frameShow = true;
    this.imageLink = img;
    this.description = description;
  }

  hide() {
    this.frameShow = false
  }

  join(url:any):void {
    this.router.navigateByUrl("/projet/" + url);
  }
}
