import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { LinkWorkService } from '../link-work.service';
import { Work } from './../common/work.model'

@Component({
  selector: 'app-work-details',
  templateUrl: './work-details.component.html'
  })
export class WorkDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private linkwork: LinkWorkService) {
    this.route.params.subscribe( params => this.url = params.name );
    this.all_work = this.linkwork.ALL_WORK;
  }

  all_work: Work[];

  url:string = "";

  ngOnInit(): void {
    console.log(this.url)
  }

}
