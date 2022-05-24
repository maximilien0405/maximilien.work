import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  // public getFreeWork(): Observable<any> {
  //   return this.http.get<any>('assets/projects/free_work.json').pipe(
  //     map((data) => data),
  //     catchError((error) => throwError(error))
  //   );
  // }

  // public getPersoWork(): Observable<any> {
  //   return this.http.get<any>('assets/projects/perso_work.json').pipe(
  //     map((data) => data),
  //     catchError((error) => throwError(error))
  //   );
  // }

  // public getDailyWork(): Observable<any> {
  //   return this.http.get<any>('assets/projects/daily_work.json').pipe(
  //     map((data) => data),
  //     catchError((error) => throwError(error))
  //   );
  // }

  public getHomeWork(): Observable<any> {
    return this.http.get<any>('assets/work-list/home_work.json').pipe(
      map((data) => data),
      catchError((error) => throwError(error))
    );
  }

  public getAllWork(): Observable<any> {
    return this.http.get<any>('assets/work-list/all_work.json').pipe(
      map((data) => data),
      catchError((error) => throwError(error))
    );
  }
}
