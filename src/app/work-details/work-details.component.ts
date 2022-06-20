import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { SwiperComponent } from 'swiper/angular';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-work-details',
  templateUrl: './work-details.component.html'
})
export class WorkDetailsComponent implements OnInit {

  public all_work:any;
  public total_all:any = [];
  public total_all_work:any = [];
  public url: string = "";
  public workIsProject: boolean = false;
  public lang = localStorage.getItem('lang')
  public readonly API_URL = environment.api;
  @ViewChild('swiper2', { static: false }) swiper: SwiperComponent;

  breakpoints = {
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

  constructor(private router: Router, private route: ActivatedRoute, private projectService: ProjectsService, private translate: TranslateService) {
    this.route.params.subscribe(params => this.url = params.name);

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang
    })

    this.projectService.getAllWork(this.lang).subscribe(res => {
      this.all_work = res.data;

      for (let x in this.all_work) {
        if(this.all_work[x].attributes.type == 'project') {
          this.total_all_work.push(this.all_work[x].attributes)
        }

        this.total_all.push(this.all_work[x].attributes)
      }
    });

    console.log(this.total_all)
  }

  ngOnInit(): void { }

  next(): void {
    this.swiper.swiperRef.slideNext(250);
  }

  back(): void {
    this.swiper.swiperRef.slidePrev(250);
  }

  checkIfOneImage(array) {
    if (array.length <= 1) {
      return true;
    }
    return false;
  }

  nextProject() {
    let count = 0;

    this.total_all_work.forEach(element => {
      if(this.total_all_work[this.total_all_work.length - 1].url == this.url){
        this.router.navigateByUrl("/realisation/" + this.total_all_work[0].url);
      } else {
        this.router.navigateByUrl("/realisation/" + this.total_all_work[count + 1].url);
      }
      count =+ 1;
    });
  }
}
