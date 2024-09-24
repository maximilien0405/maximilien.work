import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { ProjectsService } from '../common/services/projects.service';
import KeenSlider, { KeenSliderInstance } from "keen-slider"

@Component({
  selector: 'app-work-details',
  templateUrl: './work-details.component.html'
})
export class WorkDetailsComponent implements AfterViewInit {
  public all_work:any;
  public total_all:any = [];
  public total_all_work:any = [];
  public url: string = "";
  public workIsProject: boolean = false;
  public lang = localStorage.getItem('lang')
  public readonly API_URL = environment.api;

  public sliderConfig: KeenSliderInstance;
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>;

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.sliderConfig = new KeenSlider(this.sliderRef.nativeElement, {
        initial: 0,
        loop: true,
        slides: { perView: 1, spacing: 20 },
      });
    }, 350);
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    private translate: TranslateService)
  {
    this.route.params.subscribe(params => this.url = params.name);

    // Change lang if changed on navbar
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang
    })

    // Get the realisation and set
    this.projectService.getAllWork(this.lang).subscribe(res => {
      this.all_work = res.data;
      for (let x in this.all_work) {
        if(this.all_work[x].attributes.type == 'project') {
          this.total_all_work.push(this.all_work[x].attributes)
        }
        this.total_all.push(this.all_work[x].attributes)
      }
    });
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
