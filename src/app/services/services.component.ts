import { Component, ViewChild } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { SwiperComponent } from 'swiper/angular';
import { FeedbackService } from '../common/services/feedback.service';
import { environment } from 'src/environments/environment';
import { ProjectsService } from '../common/services/projects.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  public lang = this.translate.currentLang;
  public all_feedback:any;
  public total_all_feedback:any = [];
  public all_work: any;
  public total_all_work: any = [];
  public readonly API_URL = environment.api;
  
  public breakpointsWork = {
    '640': {
      slidesPerView: 1,
      spaceBetween: 20
    },
    '768': {
      slidesPerView: 2,
      spaceBetween: 20
    },
    '1024': {
      slidesPerView: 2,
      spaceBetween: 20
    }
  }

  public breakpointsFeedback = {
    '640': {
      slidesPerView: 1,
      spaceBetween: 20
    },
    '768': {
      slidesPerView: 1,
      spaceBetween: 20
    },
    '1024': {
      slidesPerView: 1,
      spaceBetween: 20
    }
  }

  @ViewChild('swiperWork', { static: false }) swiperWork: SwiperComponent;
  @ViewChild('swiperFeedback', { static: false }) swiperFeedback: SwiperComponent;

  constructor(private translate: TranslateService,
    private feedbackService: FeedbackService,
    private projectService: ProjectsService)
  {
    // Change lang if changed on navbar
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang
    });

    // Get all the work
    this.projectService.getAllWork(this.lang).subscribe(res => {
      this.all_work = res.data;
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

  // Go next in slider
  public nextFeedback(): void {
    this.swiperFeedback.swiperRef.slideNext(400);
  }

  // Go back in slider
  public backFeedback(): void {
    this.swiperFeedback.swiperRef.slidePrev(400);
  }

  public nextWork(): void {
    this.swiperWork.swiperRef.slideNext(400);
  }

  public backWork(): void {
    this.swiperWork.swiperRef.slidePrev(400);
  }
}
