import { AfterViewInit, Component, ElementRef, OnInit, viewChild, ViewChild } from '@angular/core';
import { ProjectsService } from '../common/services/projects.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import KeenSlider, { KeenSliderInstance } from "keen-slider"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements AfterViewInit {
  public all_work:any;
  public total_all_work:any = [];
  public readonly API_URL = environment.api;
  public lang = this.translate.currentLang;

  public sliderConfig: KeenSliderInstance;
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>;

  constructor(
    private projectService: ProjectsService,
    private translate: TranslateService)
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
