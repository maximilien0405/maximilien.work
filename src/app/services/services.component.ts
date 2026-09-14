import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { FeedbackService } from '../common/services/feedback.service';
import { ProjectsService } from '../common/services/projects.service';
import { FeedbackAttributes, FeedbackEntry } from '../common/models/feedback.model';
import { ProjectAttributes, ProjectEntry } from '../common/models/project.model';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class ServicesComponent implements AfterViewInit, OnDestroy {
  public lang = this.translate.getCurrentLang() || 'fr';
  public allFeedback: FeedbackEntry[] = [];
  public totalAllFeedback: FeedbackAttributes[] = [];
  public allWork: ProjectEntry[] = [];
  public totalAllWork: ProjectAttributes[] = [];
  public readonly API_URL = environment.api;

  public sliderConfig: KeenSliderInstance;
  @ViewChild('sliderRef') sliderRef: ElementRef<HTMLElement>;

  private langChange$: Subscription;
  private work$: Subscription;
  private feedback$: Subscription;

  constructor(
    private translate: TranslateService,
    private feedbackService: FeedbackService,
    private projectService: ProjectsService,
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

    // Get all the work
    this.work$ = this.projectService.getAllWork(this.lang).subscribe((res) => {
      this.allWork = res.data;
      this.totalAllWork = [];

      for (const work of this.allWork) {
        this.totalAllWork.push(work.attributes);
      }
    });

    // Get all the feedback
    this.feedback$ = this.feedbackService.getAllFeedback(this.lang).subscribe((res) => {
      this.allFeedback = res.data;
      for (const feedback of this.allFeedback) {
        this.totalAllFeedback.push(feedback.attributes);
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
    this.feedback$?.unsubscribe();
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
