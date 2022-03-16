import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Work } from '../common/work.model';
import { ProjectsService } from '../projects.service';
import { Router } from '@angular/router';
import { NgxGlideComponent } from 'ngx-glide';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public component_home_work: Work[];
  public frameShow:boolean = false;
  public imageLink:string = "";
  public description: string = "";
  public lang = this.translate.currentLang

  constructor(private projectService: ProjectsService, private router: Router, private translate: TranslateService) {
    setTimeout(() => {
      this.glideRecreate();
    }, 100);
  }

  @ViewChild(NgxGlideComponent, { static: false }) ngxGlide: NgxGlideComponent;

  breakpoints:Record<string, unknown> = {
    800: {
      perView: 1,
      peek: { before: 0, after: 1 }
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

  glideRecreate() {
    console.log("Glide recreated")
    this.ngxGlide.recreate();
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

  
}
