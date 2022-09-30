import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }
  private readonly API_URL = environment.api;

  public getAllWork(lang:any): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/projects?sort[0]=id%3Adesc&locale=${lang}&populate[0]=content.image&populate[1]=images&populate[2]=links&populate[3]=tags&populate[4]=preview_image`).pipe(map(res => res));
  }
}
