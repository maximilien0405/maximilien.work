import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Work } from './../common/work.model'

@Component({
  selector: 'app-all-work',
  templateUrl: './all-work.component.html'
})
export class AllWorkComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
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
