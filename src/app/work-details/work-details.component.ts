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
export class WorkDetailsComponent {
  public all_work:any = [];
  public all_projects_work: any = [];
  public current_work: any = [];
  public url: string = "";
  public workIsProject: boolean = false;
  public lang = localStorage.getItem('lang')
  public readonly API_URL = environment.api;

  public sliderConfig: KeenSliderInstance;
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>;

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

    // Get all work
    const allWork = localStorage.getItem('allWork');
    if(allWork) {
     this.processAllWork(JSON.parse(allWork));
    }

    this.projectService.getAllWork(this.lang).subscribe(res => {
      this.processAllWork(res.data)
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
    let indexOfProject = 0;

    for (let i = 0; i < this.all_projects_work.length; i++) {
      const element = this.all_projects_work[i];
      if(element.attributes.url == this.url) indexOfProject = i;
    }

    if(this.all_projects_work[this.all_projects_work.length - 1].attributes.url == this.url){
      this.current_work = this.all_projects_work[0].attributes;
      this.url = this.all_projects_work[0].attributes.url;
    } else {
      this.current_work = this.all_projects_work[indexOfProject + 1].attributes;
      this.url = this.all_projects_work[indexOfProject + 1].attributes.url;
    }
  }

  // Process the work data
  public processAllWork(data: any) {
    this.all_work = data;
    this.all_projects_work = [];

    for (let i = 0; i < this.all_work.length; i++) {
      const element = this.all_work[i];
      if(element.attributes.type == 'project') this.all_projects_work.push(element)
      if(element.attributes.url == this.url) this.current_work = element.attributes;
    }

    if(!this.current_work.onlyoneimage) {
      setTimeout(() => {
        this.sliderConfig = new KeenSlider(this.sliderRef.nativeElement, {
          initial: 0,
          loop: true,
          slides: { perView: 1, spacing: 20 },
        });
      }, 350);
    }
  }
}
