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
  public getAllWork(lang:any) {
    return this.http.get(`${this.API_URL}/api/projects?locale=${lang}&populate=*`).pipe(
      catchError((error) => throwError(error))
    );
  }
}