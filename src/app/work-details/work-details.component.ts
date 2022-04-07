import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { NgxGlideComponent } from 'ngx-glide';
import { Work } from '../../common/work.model';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-work-details',
  templateUrl: './work-details.component.html'
})
export class WorkDetailsComponent implements OnInit {

  public component_all_work: Work[];
  public url: string = "";
  public lang = this.translate.currentLang;
  @ViewChild(NgxGlideComponent, { static: false }) ngxGlide: NgxGlideComponent;

  breakpoints:Record<string, unknown> = {
    800: {
      peek: { before: 0, after: 1 }
    }
  }

  constructor(private route: ActivatedRoute, private projectService: ProjectsService, private translate: TranslateService) {
    this.route.params.subscribe(params => this.url = params.name);

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang
    })
  }

  ngOnInit(): void {
    this.projectService.getAllWork().subscribe((res: Work[]) => {
      this.component_all_work = res;
    });
  }

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
}
