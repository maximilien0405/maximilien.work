import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FeedbacksResponse } from '../models/feedback.model';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private readonly API_URL = environment.api;

  constructor(private http: HttpClient) {}

  public getAllFeedback(lang: string): Observable<FeedbacksResponse> {
    return this.http.get<FeedbacksResponse>(`${this.API_URL}/api/feedbacks?locale=${lang}`);
  }
}
