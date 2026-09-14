import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { ProjectsService } from '../common/services/projects.service';
import { ProjectAttributes, ProjectEntry } from '../common/models/project.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  public allWork: ProjectEntry[] = [];
  public totalAllWork: ProjectAttributes[] = [];
  public readonly API_URL = environment.api;
  public lang = this.translate.getCurrentLang() || 'fr';

  public sliderConfig: KeenSliderInstance;
  @ViewChild('sliderRef') sliderRef: ElementRef<HTMLElement>;

  private langChange$: Subscription;
  private work$: Subscription;

  constructor(
    private projectService: ProjectsService,
    private translate: TranslateService,
  ) {
    // Change lang if changed on navbar
    this.langChange$ = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });

    // Get all the work
    const allWork = localStorage.getItem('allWork');
    if (allWork) {
      this.allWork = JSON.parse(allWork);
      this.totalAllWork = [];
      for (const work of this.allWork) {
        this.totalAllWork.push(work.attributes);
      }
    }

    // Get all work
    this.work$ = this.projectService.getAllWork(this.lang).subscribe((res) => {
      localStorage.setItem('allWork', JSON.stringify(res.data));
      this.allWork = res.data;
      this.totalAllWork = [];
      for (const work of this.allWork) {
        this.totalAllWork.push(work.attributes);
      }
    });
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.sliderConfig = new KeenSlider(this.sliderRef.nativeElement, {
        initial: 0,
        loop: true,
        slides: { perView: 2, spacing: 20 },
        breakpoints: {
          '(max-width: 640px)': {
            slides: { perView: 1, spacing: 20 },
          },
          '(min-width: 641px)': {
            slides: { perView: 2, spacing: 20 },
          },
        },
      });
    }, 350);
  }

  public ngOnDestroy() {
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
}
