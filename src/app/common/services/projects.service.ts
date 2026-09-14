import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectsResponse } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly API_URL = environment.api;

  constructor(private http: HttpClient) {}

  public getAllWork(lang: string): Observable<ProjectsResponse> {
    return this.http.get<ProjectsResponse>(`${this.API_URL}/api/projects?sort[0]=id%3Adesc&locale=${lang}&populate[0]=content.image&populate[1]=images&populate[2]=links&populate[3]=tags&populate[4]=preview_image`);
  }
}
