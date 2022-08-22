import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit {

  public all_articles:any;
  public total_all_articles:any = [];
  public lang = localStorage.getItem('lang')
  public readonly API_URL = environment.api;

  constructor(private articlesServices:ArticlesService, 
    private translate: TranslateService) {
      
    this.translate.onLangChange
    .subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
      
    this.articlesServices.getAllArticles().subscribe(res => {
      this.all_articles = res.data;

      for (let x in this.all_articles) {
        this.total_all_articles.push(this.all_articles[x].attributes);
      } 

      this.total_all_articles = this.total_all_articles.reverse()
    });
  }

  public ngOnInit(): void {}
}
