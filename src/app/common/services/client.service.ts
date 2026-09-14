import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientProjectsResponse, LoginResponse } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly API_URL = environment.api;
  private showDashboardLink = new BehaviorSubject<{ value?: boolean }>({});
  subjectShowDashboardLink = this.showDashboardLink.asObservable();

  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<LoginResponse> {
    const body = { identifier: username + '@gmail.com', password: password };
    return this.http.post<LoginResponse>(`${this.API_URL}/api/auth/local`, body);
  }

  public getProjectsAndClient(lang: string, nameUrl: string): Observable<ClientProjectsResponse> {
    return this.http.get<ClientProjectsResponse>(
      `${this.API_URL}/api/client-projects?populate=*&populate=links&populate=client&populate=documents&populate=documents.file&populate=progress&filters[client][url][$eq]=${nameUrl}&locale=${lang}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
    );
  }

  public udpateNavbar() {
    this.showDashboardLink.next({ value: true });
  }
}