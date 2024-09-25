import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { FeedbackService } from '../common/services/feedback.service';
import { environment } from 'src/environments/environment';
import { ProjectsService } from '../common/services/projects.service';
import KeenSlider, { KeenSliderInstance } from "keen-slider"

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html'
})
export class ServicesComponent implements AfterViewInit {
  public lang = this.translate.currentLang;
  public all_feedback:any;
  public total_all_feedback:any = [];
  public all_work: any;
  public total_all_work: any = [];
  public readonly API_URL = environment.api;

  public sliderConfig: KeenSliderInstance;
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>;

  constructor(private translate: TranslateService,
    private feedbackService: FeedbackService,
    private projectService: ProjectsService)
  {
    // Change lang if changed on navbar
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang
    });

    // Get all the work
    const allWork = localStorage.getItem('allWork');
    if(allWork) {
      this.all_work = JSON.parse(allWork);
      this.total_all_work = [];

      for (let x in this.all_work) {
        this.total_all_work.push(this.all_work[x].attributes)
      }
    }

    // Get all the work
    this.projectService.getAllWork(this.lang).subscribe(res => {
      this.all_work = res.data;
      this.total_all_work = [];

      for (let x in this.all_work) {
        this.total_all_work.push(this.all_work[x].attributes)
      }
    });

    // Get all the feedback
    this.feedbackService.getAllFeedback(this.lang).subscribe(res => {
      this.all_feedback = res.data;
      for (let x in this.all_feedback) {
        this.total_all_feedback.push(this.all_feedback[x].attributes)
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
        }
      });
    }, 350);
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
