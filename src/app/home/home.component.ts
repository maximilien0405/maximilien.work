import { Component, HostListener, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Work } from '../common/work.model';
import { LinkWorkService } from '../link-work.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private linkwork: LinkWorkService) {
    this.home_work = this.linkwork.HOME_WORK;
  }

  ngOnInit(): void {
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

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event:
    KeyboardEvent) {
      this.hide()
  }

  home_work: Work[];
}
