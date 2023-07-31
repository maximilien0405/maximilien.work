import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private readonly API_URL = environment.api;
    private showDashboardLink = new BehaviorSubject<any>({});
    subjectShowDashboardLink = this.showDashboardLink.asObservable();

    
    constructor(private http: HttpClient) { }

    public getProjectsAndClient(lang: string, nameUrl: string): Observable<any> {
        return this.http.get<any>(`${this.API_URL}/api/client-projects?populate=*&populate=links&populate=client&populate=documents&populate=documents.file&populate=progress&filters[client][url][$eq]=${nameUrl}&locale=${lang}`).pipe(map(res => res));
    }

    public udpateNavbar() {
        this.showDashboardLink.next({value: true});
    }
}