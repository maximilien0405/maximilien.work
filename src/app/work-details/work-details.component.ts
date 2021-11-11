import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGlideComponent } from 'ngx-glide';
import { Work } from '../common/work.model';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-work-details',
  templateUrl: './work-details.component.html'
})
export class WorkDetailsComponent implements OnInit {

  component_all_work: Work[];
  url:string = "";

  constructor(private route: ActivatedRoute, private projectService: ProjectsService) {
    this.route.params.subscribe( params => this.url = params.name );
  }
  ngOnInit(): void {
    this.projectService.getAllWork().subscribe((res: Work[]) => {
      this.component_all_work = res;
    });
  }

  @ViewChild(NgxGlideComponent, { static: false }) ngxGlide: NgxGlideComponent;


  breakpoints:object = {
    800: {
      peek: { before: 0, after: 50 }
    }
  }

  next(): void {
    this.ngxGlide.go('>');
  }

  back(): void {
    this.ngxGlide.go('<');
  }

  public checkIfOneImage(array: Array<string>) {
    if (array.length <= 1) {
      return true;
    }
    return false;
  }

}
