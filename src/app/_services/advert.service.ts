import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Advert } from '../_models/advert';
import { Observable, of } from 'rxjs'
import { environment } from '@environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AdvertService
{
    constructor(private http: HttpClient) {};
    
    url: string = 'api/adverts';

    getAdverts() : Observable<Advert[]>
    {
        return this.http.get<Advert[]>(`${environment.apiUrl}/adverts/`);
    }

    getAdvertsCurrentUser() : Observable<Advert[]>
    {
        return this.http.get<Advert[]>(`${environment.apiUrl}/adverts/current/${JSON.parse(localStorage.getItem('currentUser')).id}`);
    }

    getAdvert(id: number): Observable<Advert> 
    {
        if (id === 0) 
        {
            return of(this.initializeAdvert());
        }
        const url = `${environment.apiUrl}/adverts/${id}`;
        return this.http.get<Advert>(url);
    }

    createAdvert(advert: Advert) : Observable<Advert>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<Advert>(`${environment.apiUrl}/adverts`, advert, {headers});
    }

    deleteAdvert(id: number): Observable<{}> 
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.delete<Advert>(`${environment.apiUrl}/adverts/${id}`, { headers })
    }
    
    updateAdvert(advert: Advert): Observable<Advert> 
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<Advert>(`${environment.apiUrl}/adverts`, advert, { headers });
    }

    getLocations(): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<any>(`${environment.apiUrl}/adverts/locations`, {headers});
    };

    private initializeAdvert(): Advert 
    {
        return {
            id: 0,
            header: '',
            details: '',
            price: null,
            status: '',
            userID: null   
        };
    }
}