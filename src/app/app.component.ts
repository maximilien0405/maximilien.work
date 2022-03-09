import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('0.2s ease-out',
            style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('0.2s ease-in',
            style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class AppComponent {
  ngOnInit() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark-theme');
    }

    if(localStorage.getItem('theme') == 'black') {
      this.toggleDarkTheme();
    } else {
      this.toggleWhiteTheme();
    }
  }

  mobileSidebar: boolean = false;
  whiteTheme: boolean = true;

  openNav() {
    this.mobileSidebar = !this.mobileSidebar;
  }

  closeNav() {
    this.mobileSidebar = false;
  }

  toggleDarkTheme() {
    document.body.classList.add('dark-theme');
    this.whiteTheme = false;
    localStorage.setItem('theme', 'black')
  }

  toggleWhiteTheme() {
    document.body.classList.remove('dark-theme');
    this.whiteTheme = true;
    localStorage.setItem('theme', 'white')
  }

}
