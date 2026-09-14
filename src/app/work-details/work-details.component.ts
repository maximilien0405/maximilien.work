import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { ProjectsService } from '../common/services/projects.service';
import { ProjectAttributes, ProjectEntry } from '../common/models/project.model';

@Component({
  selector: 'app-work-details',
  templateUrl: './work-details.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class WorkDetailsComponent implements OnDestroy {
  public allWork: ProjectEntry[] = [];
  public allProjectsWork: ProjectEntry[] = [];
  public currentWork: ProjectAttributes;
  public url: string = '';
  public workIsProject: boolean = false;
  public lang = localStorage.getItem('lang') || 'fr';
  public readonly API_URL = environment.api;

  public sliderConfig: KeenSliderInstance;
  @ViewChild('sliderRef') sliderRef: ElementRef<HTMLElement>;

  private params$: Subscription;
  private langChange$: Subscription;
  private work$: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    private translate: TranslateService,
  ) {
    this.params$ = this.route.params.subscribe((params) => this.url = params.name);

    // Change lang if changed on navbar
    this.langChange$ = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });

    // Get all work
    const allWork = localStorage.getItem('allWork');
    if (allWork) {
      this.processAllWork(JSON.parse(allWork));
    }

    this.work$ = this.projectService.getAllWork(this.lang).subscribe((res) => {
      this.processAllWork(res.data);
    });
  }

  public ngOnDestroy() {
    this.params$?.unsubscribe();
    this.langChange$?.unsubscribe();
    this.work$?.unsubscribe();
  }

  // Go next in slider
  public next(): void {
    this.sliderConfig.next();
  }

  // Go back in slider
  public back(): void {
    this.sliderConfig.prev();
  }

  // Travel to next project
  public nextProject() {
    let indexOfProject = 0;

    for (let i = 0; i < this.allProjectsWork.length; i++) {
      const element = this.allProjectsWork[i];
      if (element.attributes.url == this.url) indexOfProject = i;
    }

    if (this.allProjectsWork[this.allProjectsWork.length - 1].attributes.url == this.url) {
      this.currentWork = this.allProjectsWork[0].attributes;
      this.url = this.allProjectsWork[0].attributes.url;
    } else {
      this.currentWork = this.allProjectsWork[indexOfProject + 1].attributes;
      this.url = this.allProjectsWork[indexOfProject + 1].attributes.url;
    }
  }

  // Process the work data
  public processAllWork(data: ProjectEntry[]) {
    this.allWork = data;
    this.allProjectsWork = [];

    for (let i = 0; i < this.allWork.length; i++) {
      const element = this.allWork[i];
      if (element.attributes.type == 'project') this.allProjectsWork.push(element);
      if (element.attributes.url == this.url) this.currentWork = element.attributes;
    }

    if (this.currentWork && !this.currentWork.onlyoneimage) {
      setTimeout(() => {
        this.sliderConfig = new KeenSlider(this.sliderRef.nativeElement, {
          initial: 0,
          loop: true,
          slides: { perView: 1, spacing: 20 },
        });
      }, 350);
    }
  }
}
