import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LinkWorkService } from '../link-work.service';
import { Work } from './../common/work.model'

@Component({
  selector: 'app-all-work',
  templateUrl: './all-work.component.html'
})
export class AllWorkComponent implements OnInit {

  constructor(private linkwork: LinkWorkService, private router: Router) {
    this.all_work = this.linkwork.ALL_WORK;
  }

  ngOnInit(): void {
  }

  public frameShow:boolean = false;
  imageLink:string = "";
  description:string = "";
  link:string = "";

  displayFrame(img:string, description:string, link:string) {
    this.frameShow = true;
    this.imageLink = img;
    this.description = description;
    this.link = link;
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
