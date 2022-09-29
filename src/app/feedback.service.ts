import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  
  constructor(private http: HttpClient) { }
  private readonly API_URL = environment.api;

  public getAllFeedback(lang: any): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/feedbacks?locale=${lang}`).pipe(map(res => res));
  }
}