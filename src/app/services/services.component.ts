import { Component, ViewChild } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { SwiperComponent } from 'swiper/angular';
import { FeedbackService } from '../common/services/feedback.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  public lang = this.translate.currentLang;
  public all_feedback:any;
  public total_all_feedback:any = [];
  
  @ViewChild('swiper', { static: false }) swiper: SwiperComponent;

  constructor(private translate: TranslateService,
    private feedbackService: FeedbackService)
  {
    // Change lang if changed on navbar
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang
    });

    // Get all the feedback
    this.feedbackService.getAllFeedback(this.lang).subscribe(res => {
      this.all_feedback = res.data;
      for (let x in this.all_feedback) {
        this.total_all_feedback.push(this.all_feedback[x].attributes)
      }
    });
  }

  public breakpoints = {
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

  // Go next in slider
  public next(): void {
    this.swiper.swiperRef.slideNext(250);
  }

  // Go back in slider
  public back(): void {
    this.swiper.swiperRef.slidePrev(250);
  }
}
