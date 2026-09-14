import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ClientService } from './common/services/client.service';
import { MetaTagsService } from './common/services/meta-tags.service';
import { fadeAnimation, slideMenuAnimation } from './common/others/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [fadeAnimation, slideMenuAnimation],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class AppComponent implements OnInit, OnDestroy {
  public languageClick: boolean = false;
  public route: string;
  public mobileSidebar: boolean = false;
  public whiteTheme: boolean = true;
  public lang: string;
  public currentYear = new Date().getFullYear();
  public showClientLink: boolean = false;
  public clientUrl: string;
  public displayMainOverlay = true;
  public willDismissMainOverlay = false;

  private routerEvents$: Subscription;
  private dashboardLink$: Subscription;

  constructor(
    public clientService: ClientService,
    public translate: TranslateService,
    private router: Router,
    private metaTags: MetaTagsService,
  ) {
    // Get router url + update SEO
    this.routerEvents$ = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.route = this.router.url;
        this.metaTags.updateMetaTags(this.router.url);
      }
    });

    translate.addLangs(['fr', 'en']);
    translate.setFallbackLang('fr');

    if (!localStorage.getItem('lang')) {
      // Get navigator language & cut it
      if (navigator.language.includes('-')) {
        this.lang = navigator.language.slice(0, 2);
      } else {
        this.lang = navigator.language;
      }

      // Set navigator language
      localStorage.setItem('lang', this.lang);
      this.translate.setFallbackLang(this.lang);
      this.translate.use(this.lang);
    }

    // Display navbar client link if localstorage
    if (localStorage.getItem('clientUrl')) {
      this.clientUrl = localStorage.getItem('clientUrl') || '';
      this.showClientLink = true;
    }

    // Listen to navbar header client
    this.dashboardLink$ = this.clientService.subjectShowDashboardLink.subscribe((res) => {
      if (res.value) {
        this.clientUrl = localStorage.getItem('clientUrl') || '';
        this.showClientLink = true;
      }
    });
  }

  public ngOnInit() {
    // Add dark theme if navigator dark
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark-theme');
    }

    // Set the right theme
    if (localStorage.getItem('theme') == 'black') {
      this.toggleDarkTheme();
    } else {
      this.toggleWhiteTheme();
    }

    // Set the right lang
    if (localStorage.getItem('lang') == 'en') {
      this.translate.use('en');
      this.lang = 'en';
    } else {
      this.translate.use('fr');
      this.lang = 'fr';
    }

    this.metaTags.updateMetaTags(this.router.url);

    setTimeout(() => {
      this.willDismissMainOverlay = true;
      setTimeout(() => {
        this.displayMainOverlay = false;
      }, 50);
    }, 50);
  }

  public ngOnDestroy() {
    this.routerEvents$?.unsubscribe();
    this.dashboardLink$?.unsubscribe();
  }

  // Display or not language dropdown
  public languageBox() {
    this.languageClick = !this.languageClick;
  }

  // Change the language
  public changeLang(lang: string) {
    this.translate.use(lang);
    this.translate.setFallbackLang(lang);
    localStorage.setItem('lang', lang);
    this.lang = lang;
    this.languageClick = false;
    this.mobileSidebar = false;
    this.metaTags.updateMetaTags(this.router.url);
  }

  // Open the mobile nav
  public openNav() {
    this.mobileSidebar = true;
    if (this.mobileSidebar) {
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('overflow');
    }
  }

  // Close the mobile nav
  public closeNav() {
    this.mobileSidebar = false;
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('overflow');
  }

  // Toggle dark theme
  public toggleDarkTheme() {
    document.body.classList.add('dark-theme');
    this.whiteTheme = false;
    localStorage.setItem('theme', 'black');
    this.mobileSidebar = false;
  }

  // Toggle white theme
  public toggleWhiteTheme() {
    document.body.classList.remove('dark-theme');
    this.whiteTheme = true;
    localStorage.setItem('theme', 'white');
    this.mobileSidebar = false;
  }
}
