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

  public frameShow: boolean = false;
  public imageLink: string = "";
  public description: string = "";
  public lang = this.translate.currentLang;
  @ViewChild('swiper', { static: false }) swiper: SwiperComponent;

  breakpoints = {
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

  constructor(private projectService: ProjectsService, private router: Router, private translate: TranslateService) {
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

  ngOnInit(): void {}

  next(): void {
    this.swiper.swiperRef.slideNext(250);
  }

  back(): void {
    this.swiper.swiperRef.slidePrev(250);
  }

  displayFrame(img_preview: string, description: string) {
    this.frameShow = true;
    this.imageLink = img_preview;
    this.description = description;
  }

  hide() {
    this.frameShow = false
  }

  join(url: any): void {
    this.router.navigateByUrl("/realisation/" + url);
  }
}
