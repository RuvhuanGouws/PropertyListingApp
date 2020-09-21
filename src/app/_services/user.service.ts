import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/user`);
    }

    createUser(user: User) : Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        //user.id = null;
        return this.http.post<any>(`${environment.apiUrl}/user`, user, {headers});
    }

    updateUser(user: User): Observable<User> 
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<User>(`${environment.apiUrl}/adverts`, user, { headers });
    }
}