import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public all_work:any;
  public total_all_work:any = [];
  public readonly API_URL = environment.api;
  public lang = this.translate.currentLang;
  @ViewChild('swiper', { static: false }) swiper: SwiperComponent;

  public breakpoints = {
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

  constructor(private projectService: ProjectsService, 
    private router: Router, 
    private translate: TranslateService) {

    this.translate.onLangChange
    .subscribe((event: LangChangeEvent) => {
      this.lang = event.lang
    });

    this.projectService.getAllWork(this.lang).subscribe(res => {
      this.all_work = res.data;

      for (let x in this.all_work) {
        this.total_all_work.push(this.all_work[x].attributes)
      }
    });
  }

  public ngOnInit(): void {}

  public next(): void {
    this.swiper.swiperRef.slideNext(250);
  }

  public back(): void {
    this.swiper.swiperRef.slidePrev(250);
  }

  public join(url: any): void {
    this.router.navigateByUrl("/realisation/" + url);
  }
}
