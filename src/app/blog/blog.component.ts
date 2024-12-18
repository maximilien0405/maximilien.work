import { Component } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { ArticlesService } from '../common/services/articles.service';
import { fadeAnimation } from '../common/others/animations';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  animations: [fadeAnimation]
})
export class BlogComponent {
  public all_articles:any;
  public lang = localStorage.getItem('lang')
  public readonly API_URL = environment.api;

  constructor(
    private articlesServices: ArticlesService,
    private translate: TranslateService)
  {
    // Change lang if changed on navbar
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });

    // Get all articles
    const allArticles = localStorage.getItem('allArticles');
    if(allArticles) {
      this.all_articles = JSON.parse(allArticles).reverse();
    }

    this.articlesServices.getAllArticles().subscribe(res => {
      this.all_articles = res.data.reverse();
    });
  }
}
