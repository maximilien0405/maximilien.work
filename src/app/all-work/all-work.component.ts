import { Component, OnInit } from '@angular/core';
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

  all_work: Work[];

  join(url:any):void {
    this.router.navigateByUrl("/projet/" + url);
  }
}
