import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }
  
  public getAllWork(): Observable<any> {
    return this.http.get<any>('assets/projects/all_work.json').pipe(
      map((data) => data),
      catchError((error) => throwError(error))
    );
  }

  public getHomeWork(): Observable<any> {
    return this.http.get<any>('assets/projects/home_work.json').pipe(
      map((data) => data),
      catchError((error) => throwError(error))
    );
  }
}
