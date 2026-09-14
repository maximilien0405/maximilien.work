import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ClientService } from '../common/services/client.service';
import { ClientAttributes, ClientProjectEntry, LoginResponse } from '../common/models/client.model';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class ClientDashboardComponent implements OnDestroy {
  public locked: boolean = true;
  public showPassword: boolean;
  public errorFormPwd: boolean;
  public clientUrl: string;
  public passwordValue: string;

  public client: ClientAttributes;
  public projects: ClientProjectEntry[] = [];

  public spinnerDisplay: boolean;
  public lang = this.translate.getCurrentLang() || 'fr';
  public projectIndex: number = Number(localStorage.getItem('projectIndex')) || 0;

  private params$: Subscription;
  private langChange$: Subscription;
  private login$: Subscription;
  private data$: Subscription;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private router: Router,
  ) {
    this.params$ = this.route.params.subscribe((params) => this.clientUrl = params.name);

    // Listen to lang change
    this.langChange$ = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang != this.lang) {
        this.lang = event.lang;
        this.getAllData();
      }
    });

    // Display navbar client link if localstorage
    if (localStorage.getItem('clientUrl')) {
      this.locked = false;
      this.getAllData();
    }
  }

  public ngOnDestroy() {
    this.params$?.unsubscribe();
    this.langChange$?.unsubscribe();
    this.login$?.unsubscribe();
    this.data$?.unsubscribe();
  }

  // Show or not the password
  public toogleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  // If password value changes, remove error
  public onPasswordChange(event: string) {
    if (event && this.errorFormPwd) {
      this.errorFormPwd = false;
    }
  }

  // Get a client with it's projects, if not return error
  public getClientWithProjects() {
    this.spinnerDisplay = true;
    this.errorFormPwd = false;

    this.login$?.unsubscribe();
    this.login$ = this.clientService.login(this.clientUrl, this.passwordValue).subscribe({
      next: (res: LoginResponse) => {
        if (res.jwt) {
          localStorage.setItem('token', res.jwt);
          this.getAllData();
        }
      },
      error: () => {
        setTimeout(() => {
          this.errorFormPwd = true;
          this.spinnerDisplay = false;
        }, 1400);
      },
    });
  }

  // Get all the data needed (projects and client)
  public getAllData() {
    const clientUrl = localStorage.getItem('clientUrl') || this.clientUrl;

    this.data$?.unsubscribe();
    this.data$ = this.clientService.getProjectsAndClient(this.lang, clientUrl).subscribe((res) => {
      if (res.data[0]) {
        let timeout = 0;
        if (this.locked) timeout = 1400;

        setTimeout(() => {
          if (this.locked) {
            setTimeout(() => {
              this.clientService.udpateNavbar();
            }, 300);
          }

          this.locked = false;
          this.client = res.data[0].attributes.client.data.attributes;
          this.projects = res.data;

          localStorage.setItem('clientUrl', this.clientUrl);
        }, timeout);
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }

  // Change the index of projects
  public changeIndexProject(index: number) {
    this.projectIndex = index;
    localStorage.setItem('projectIndex', JSON.stringify(index));
  }

  // Determine the steps of a project
  public getProjectSteps(project: ClientProjectEntry) {
    let totaStepsComplete = 0;
    for (const step of project.attributes.progress) {
      if (step.status == 'done') totaStepsComplete++;
    }
    return totaStepsComplete;
  }
}
