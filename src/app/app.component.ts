import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
  public lang = this.translate.currentLang;
  public languageClick = false;

  constructor(public translate: TranslateService) {
    translate.addLangs(['fr','en'])
    translate.setDefaultLang('fr')

    /* Code pour trouver langue user */
    let lang = window.navigator.languages ? window.navigator.languages[0] : null;
    lang = lang || window.navigator.language;

    let shortLang = lang;
    if (shortLang.indexOf('-') !== -1)
        shortLang = shortLang.split('-')[0];

    if (shortLang.indexOf('_') !== -1)
        shortLang = shortLang.split('_')[0];

    this.lang = shortLang;

    /* ----------------- */

    if (shortLang == "fr") {
      translate.use('fr')
    } else {
      translate.use('en')
    }

    if(localStorage.getItem('lang') == 'en') {
      translate.use('en')
      this.lang = 'en';
      return
    } else if (localStorage.getItem('lang') == 'fr') {
      this.lang = 'fr';
      translate.use('fr')
      return
    }
  }

  languageBox() {
    this.languageClick = !this.languageClick;
  }

  changeLang(lang:string) {
    this.translate.currentLang == lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang)
    this.lang = lang;
    this.languageClick = false;
  }

  ngOnInit() {
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

    console.log(this.lang)
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
