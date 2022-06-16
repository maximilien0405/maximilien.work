import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { NgxGlideComponent } from 'ngx-glide';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-work-details',
  templateUrl: './work-details.component.html'
})
export class WorkDetailsComponent implements OnInit {

  public component_all_work = [];
  public component_project_work = [];
  public url: string = "";
  public workIsProject: boolean = false;
  public lang = this.translate.currentLang;
  @ViewChild(NgxGlideComponent, { static: false }) ngxGlide: NgxGlideComponent;

  breakpoints:Record<string, unknown> = {
    800: {
      peek: { before: 0, after: 1 }
    }
  }

  constructor(private router: Router, private route: ActivatedRoute, private projectService: ProjectsService, private translate: TranslateService) {
    this.route.params.subscribe(params => this.url = params.name);

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang
    })

    // this.projectService.getProjectWork().subscribe((res: Work[]) => {
    //   for (let index = 0; index < res.length; index++) {
    //     this.component_all_work.push(res[index]);
    //   }
    // });
    // this.projectService.getOtherWork().subscribe((res: Work[]) => {
    //   for (let index = 0; index < res.length; index++) {
    //     this.component_all_work.push(res[index]);
    //   }
    // });
    // this.projectService.getProjectWork().subscribe((res: Work[]) => {
    //   this.component_project_work = res;
    // });
  }

  ngOnInit(): void { }

  next(): void {
    this.ngxGlide.go('>');
  }

  back(): void {
    this.ngxGlide.go('<');
  }

  checkIfOneImage(array: Array<string>) {
    if (array.length <= 1) {
      return true;
    }
    return false;
  }

  // nextProject(url: string) {
  //   let currentProject = false;

  //   this.component_project_work.forEach(element => {
  //     if(currentProject){
  //       this.router.navigateByUrl("/realisation/" + element.url);
  //       currentProject = false;
  //     }
  //     if(element.url == url){
  //       currentProject = true;
  //     }
  //   });
  // }

  // isProject() {
  //   this.component_all_work.forEach(element => {
  //     if (element.url == this.url) {
  //       console.log(element.url)
  //       this.workIsProject = true
  //     }
  //   });

  //   console.log(this.workIsProject)
  // }
}
