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
  mobileSidebar: boolean = false;

  constructor(private projectService: ProjectsService, private router: Router) {
  }

  // Get the component instance.
  @ViewChild(NgxGlideComponent, { static: false }) ngxGlide: NgxGlideComponent;


  breakpoints:object = {
    800: {
      perView: 1,
      peek: { before: 0, after: 50 }
    }
  }

  ngOnInit(): void {
    this.projectService.getHomeWork().subscribe((res: Work[]) => {
      this.component_home_work = res;
    });

    this.ngxGlide.perView = 2;
    this.ngxGlide.showArrows = false;
    this.ngxGlide.showBullets = false;
    this.ngxGlide.breakpoints = this.breakpoints;
  }

  next(): void {
    this.ngxGlide.go('>');
  }

  back(): void {
    this.ngxGlide.go('<');
  }

  displayFrame(img_preview:string, description:string) {
    this.frameShow = true;
    this.imageLink = img_preview;
    this.description = description;
  }

  hide() {
    this.frameShow = false
  }

  join(url:any):void {
    this.router.navigateByUrl("/projet/" + url);
  }

  openNav() {
    this.mobileSidebar = !this.mobileSidebar;
  }

  closeNav() {
    this.mobileSidebar = false;
  }
}
