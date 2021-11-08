import { Component, HostListener, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Work } from '../common/work.model';
import { ProjectsService } from '../projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  
  component_home_work: Work[];
  
  constructor(private projectService: ProjectsService, private router: Router) {
  }

  ngOnInit(): void {
    this.projectService.getHomeWork().subscribe((res: Work[]) => {
      this.component_home_work = res;
    });
  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    margin: 20,
    navSpeed: 600,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      760: {
        items: 2
      },
      1000: {
        items: 2
      }
    },
    nav: true,
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

  join(url:any):void {
    this.router.navigateByUrl("/projet/" + url);
  }
}
