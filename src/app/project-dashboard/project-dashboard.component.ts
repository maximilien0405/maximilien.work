import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html'
})
export class ProjectDashboardComponent implements OnInit {
  public locked: boolean;
  public showPassword: boolean;
  public errorPwd: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  // Show or not the password
  public toogleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
