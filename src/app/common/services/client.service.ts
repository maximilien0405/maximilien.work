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

    public getClient(nameUrl: string, password: string): Observable<any> {
        //return this.http.get<any>(`${this.API_URL}/api/clients?filters[$and][0][name][$eq]=${name}&filters[$and][1][password][$eq]=${password}`).pipe(map(res => res));

        return this.http.get<any>(`${this.API_URL}/api/clients?populate[0]=projects&?filters[url][$eq]=${nameUrl}`).pipe(map(res => res));
    }

    public udpateNavbar() {
        this.showDashboardLink.next({value: true});
    }
}
