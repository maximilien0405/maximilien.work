import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('inOutAnimation', [
        transition(
          ':enter', [
            style({ opacity: 0 }),
            animate('0.2s ease-out',
            style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', [
            style({ opacity: 1 }),
            animate('0.2s ease-in',
            style({ opacity: 0 }))
          ]
        )
      ]
    ),
    trigger('inOutAnimationSlow', [
        transition(
          ':enter', [
            style({ opacity: 0 }),
            animate('0.1s ease-out',
            style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', [
            style({ opacity: 1 }),
            animate('0.1s ease-in',
            style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class AppComponent {
  public languageClick:Boolean = false;
  public route:String;
  public mobileSidebar: boolean = false;
  public whiteTheme: boolean = true;
  public lang: string | any;
  public url = new URL(window.location.href);
  public currentYear = new Date().getFullYear()

  constructor(
    public translate: TranslateService, 
    private router: Router)
  {
    // Get router url
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.route = this.router.url;
      }
    });

    translate.addLangs(['fr','en'])
    translate.setDefaultLang('fr')

    if(!localStorage.getItem('lang')) {
      // Get navigator language & cut it
      if (navigator.language.includes("-")) {
        this.lang = navigator.language.slice(0, 2);
      } else {
        this.lang = navigator.language;
      }

      // Set navigator language
      localStorage.setItem("lang", this.lang);
      this.translate.setDefaultLang(this.lang);
      this.translate.use(this.lang)
    }
  }

  // Display or not language dropdown
  public languageBox() {
    this.languageClick = !this.languageClick;
  }

  // Change the language
  public changeLang(lang:string) {
    this.translate.use(lang);
    this.translate.setDefaultLang(lang);
    localStorage.setItem('lang', lang)
    this.lang = lang;
    this.languageClick = false;
    this.mobileSidebar = false;
  }

  public ngOnInit() {
    // Add dark theme if navigator dark
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark-theme');
    }

    // Set the right theme
    if(localStorage.getItem('theme') == 'black') {
      this.toggleDarkTheme();
    } else {
      this.toggleWhiteTheme();
    }

    // Set the right lang
    if(localStorage.getItem('lang') == 'en') {
      this.translate.use('en');
      this.lang = 'en';
    } else {
      this.translate.use('fr');
      this.lang = 'fr';
    }
  }

  // Open the movile nav
  public openNav() {
    this.mobileSidebar = !this.mobileSidebar;
  }

  // Close the mobile nav
  public closeNav() {
    this.mobileSidebar = false;
  }

  // Toggle dark theme
  public toggleDarkTheme() {
    document.body.classList.add('dark-theme');
    this.whiteTheme = false;
    localStorage.setItem('theme', 'black')
    this.mobileSidebar = false;
  }

  // Toggle white theme
  public toggleWhiteTheme() {
    document.body.classList.remove('dark-theme');
    this.whiteTheme = true;
    localStorage.setItem('theme', 'white')
    this.mobileSidebar = false;
  }
}