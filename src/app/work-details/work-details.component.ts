import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Work } from '../common/work.model';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-work-details',
  templateUrl: './work-details.component.html'
})
export class WorkDetailsComponent implements OnInit {

  component_all_work: Work[];

  constructor(private route: ActivatedRoute, private projectService: ProjectsService) {
    this.route.params.subscribe( params => this.url = params.name );
  }
  ngOnInit(): void {
    this.projectService.getAllWork().subscribe((res: Work[]) => {
      this.component_all_work = res;
    });
  }

  url:string = "";

}
