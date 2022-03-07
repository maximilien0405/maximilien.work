import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  mobileSidebar: boolean = false;

  openNav() {
    this.mobileSidebar = !this.mobileSidebar;
  }

  closeNav() {
    this.mobileSidebar = false;
  }
}
