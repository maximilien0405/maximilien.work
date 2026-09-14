import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectsService } from '../common/services/projects.service';
import { fadeAnimation } from '../common/others/animations';
import { ProjectAttributes, ProjectEntry } from '../common/models/project.model';

@Component({
  selector: 'app-all-work',
  templateUrl: './all-work.component.html',
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class AllWorkComponent implements OnDestroy {
  public allWork: ProjectEntry[] = [];
  public totalAllPersonnal: ProjectAttributes[] = [];
  public totalAllOther: ProjectAttributes[] = [];
  public totalAllFreelance: ProjectAttributes[] = [];
  public totalSelectedWork: ProjectAttributes[] = [];
  public lang = localStorage.getItem('lang') || 'fr';
  public readonly API_URL = environment.api;

  private langChange$: Subscription;
  private work$: Subscription;

  constructor(
    private projectService: ProjectsService,
    private translate: TranslateService,
  ) {
    // Get all the work
    const allWork = localStorage.getItem('allWork');
    if (allWork) {
      this.processAllWork(JSON.parse(allWork));
    }

    this.langChange$ = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });

    // Get all work and divide in category
    this.work$ = this.projectService.getAllWork(this.lang).subscribe((res) => {
      this.processAllWork(res.data);
    });
  }

  public ngOnDestroy() {
    this.langChange$?.unsubscribe();
    this.work$?.unsubscribe();
  }

  // Change the type
  public changeType(type: string): void {
    if (type == 'personnal') {
      this.totalSelectedWork = this.totalAllPersonnal;
    } else if (type == 'other') {
      this.totalSelectedWork = this.totalAllOther;
    } else if (type == 'freelance') {
      this.totalSelectedWork = this.totalAllFreelance;
    }
  }

  // Set and filter all work
  public processAllWork(data: ProjectEntry[]) {
    this.allWork = data;
    this.totalAllPersonnal = [];
    this.totalAllOther = [];
    this.totalAllFreelance = [];

    for (const work of this.allWork) {
      if (work.attributes.category == 'personnal') {
        this.totalAllPersonnal.push(work.attributes);
      } else if (work.attributes.category == 'other') {
        this.totalAllOther.push(work.attributes);
      } else if (work.attributes.category == 'freelance') {
        this.totalAllFreelance.push(work.attributes);
      }
    }

    this.totalSelectedWork = this.totalAllPersonnal;
  }
}
