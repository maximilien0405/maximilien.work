import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { SwiperComponent } from 'swiper/angular';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html'
})
export class ServicesComponent implements OnInit {
  public lang = this.translate.currentLang;
  public all_feedback:any;
  public total_all_feedback:any = [];
  
  @ViewChild('swiper', { static: false }) swiper: SwiperComponent;

  constructor(private translate: TranslateService, private feedbackService: FeedbackService) {
    this.translate.onLangChange
    .subscribe((event: LangChangeEvent) => {
      this.lang = event.lang
    });

    this.feedbackService.getAllFeedback(this.lang).subscribe(res => {
      this.all_feedback = res.data;

      console.log(res)

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

  ngOnInit(): void {
  }

  public next(): void {
    this.swiper.swiperRef.slideNext(250);
  }

  public back(): void {
    this.swiper.swiperRef.slidePrev(250);
  }

}
