import { Component, OnInit } from '@angular/core';
import { ClientService } from '../common/services/client.service';
import { ActivatedRoute } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html'
})
export class ClientDashboardComponent {
  public locked: boolean = true;
  public showPassword: boolean;
  public errorPwd: boolean;
  public errorFormPwd: boolean;
  public clientUrl: string;
  public passwordValue: string;

  public client: any = [];
  public projects: any = [];

  public spinnerDisplay: boolean; 
  public lang = this.translate.currentLang;
  public projectIndex: number = Number(localStorage.getItem('projectIndex')) || 0;

  constructor(private clientService: ClientService,
    private route: ActivatedRoute,
    private translate: TranslateService)
  {
    this.route.params.subscribe(params => this.clientUrl = params.name);

    // Listen to lang change
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang != this.lang) {
        this.lang = event.lang;
        this.getAllData();
      }
    });

    // Display navbar client link if localstoarge
    if (localStorage.getItem('clientUrl')) {
      this.locked = false;
      this.getAllData();      
    }
  }

  // Show or not the password
  public toogleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  // If password value changes, remove error
  public onPasswordChange(event: any) {
    if (event && this.errorPwd) {
      this.errorPwd = false;
      this.errorFormPwd = false;
    }
  }

  // Get a client with it's projects, if not return error
  public getClientWithProjects() {
    this.spinnerDisplay = true;
    this.errorPwd = false;
    this.errorFormPwd = false;
    this.getAllData();

    setTimeout(() => {
      if (this.errorPwd) this.errorFormPwd = true;
      this.spinnerDisplay = false;
    }, 1400);    
  }

  // Get all the data needed (projects and client)
  public getAllData() {
    const clientUrl = localStorage.getItem('clientUrl') || this.clientUrl;
    const clientPwd = localStorage.getItem('clientPassword') || '';

    this.clientService.getProjectsAndClient(this.lang, clientUrl).subscribe((res: any) => {
      if (res.data[0]) {
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
          localStorage.setItem('clientPassword', this.passwordValue);
        }, 1400);  
      } else {
        if (this.locked) {
          this.errorPwd = true;
        }
      }
    })
  }

  // Change the index of projects
  public changeIndexProject(index: number) {
    this.projectIndex = index;
    localStorage.setItem('projectIndex', JSON.stringify(index));
  }
}
