import { Component, OnInit } from '@angular/core';
import { ClientService } from '../common/services/client.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html'
})
export class ClientDashboardComponent {
  public locked: boolean = true;
  public showPassword: boolean;
  public errorPwd: boolean;
  public clientUrl: string;
  public passwordValue: string;
  public client: any = [];
  public spinnerDisplay: boolean; 
  public lang = this.translate.currentLang;
  public projectIndex: number = Number(localStorage.getItem('projectIndex')) || 0;

  constructor(private clientService: ClientService,
    private route: ActivatedRoute,
    private translate: TranslateService)
  {
    this.route.params.subscribe(params => this.clientUrl = params.name);

    // Display navbar client link if localstoarge
    if (localStorage.getItem('clientUrl')) {
      if (this.clientUrl == localStorage.getItem('clientUrl') || '') {
        this.locked = false;
        const clientUrl = localStorage.getItem('clientUrl') || '';
        const clientPwd = localStorage.getItem('clientPassword') || '';

        this.clientService.getClient(clientUrl, clientPwd).subscribe((res: any) => {
          if (res.data[0]) {
            this.locked = false;
            this.client = res.data[0].attributes;
          }
        })
      }
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
    }
  }

  // Get a client with it's projects, if not return error
  public getClientWithProjects() {
    this.spinnerDisplay = true;
    this.errorPwd = false;
    
    this.clientService.getClient(this.clientUrl, this.passwordValue).subscribe((res: any) => {
      setTimeout(() => {
        if (res.data[0]) {
          this.locked = false;
          this.client = res.data[0].attributes;
          localStorage.setItem('clientUrl', this.clientUrl)
          localStorage.setItem('clientPassword', this.passwordValue)

          setTimeout(() => {
            this.clientService.udpateNavbar();
          }, 300);
        } else {
          this.errorPwd = true;
        }
      
        this.spinnerDisplay = false;
      }, 1400);    
      
    })
  }

  // Change the index of projects
  public changeIndexProject(index: number) {
    this.projectIndex = index;
    localStorage.setItem('projectIndex', JSON.stringify(index));
  }
}
