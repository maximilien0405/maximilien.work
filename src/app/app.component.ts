import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationEnd, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

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
    ),
    trigger(
      'inOutAnimationSlow',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('0.1s ease-out',
            style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
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

  constructor(public translate: TranslateService, 
    private router: Router) {
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

  public languageBox() {
    this.languageClick = !this.languageClick;
  }

  public changeLang(lang:string) {
    window.location.reload();
    this.translate.use(lang);
    this.translate.setDefaultLang(lang);
    localStorage.setItem('lang', lang)
    this.lang = lang;
    this.languageClick = false;
  }

  public ngOnInit() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark-theme');
    }

    if(localStorage.getItem('theme') == 'black') {
      this.toggleDarkTheme();
    } else {
      this.toggleWhiteTheme();
    }

    if(localStorage.getItem('lang') == 'en') {
      this.translate.use('en');
      this.lang = 'en';
    } else {
      this.translate.use('fr');
      this.lang = 'fr';
    }
  }

  public openNav() {
    this.mobileSidebar = !this.mobileSidebar;
  }

  public closeNav() {
    this.mobileSidebar = false;
  }

  public toggleDarkTheme() {
    document.body.classList.add('dark-theme');
    this.whiteTheme = false;
    localStorage.setItem('theme', 'black')
  }

  public toggleWhiteTheme() {
    document.body.classList.remove('dark-theme');
    this.whiteTheme = true;
    localStorage.setItem('theme', 'white')
  }
}
