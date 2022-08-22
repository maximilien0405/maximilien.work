import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  
  constructor(private http: HttpClient) { }
  private readonly API_URL = environment.api;

  public getAllArticles(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/articles?populate[0]=tags`).pipe(map(res => res));
  }
}