import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models/user';
import { Observable } from 'rxjs'
import { environment } from '@environments/environment';

@Injectable({
    providedIn: 'root'
})

export class UserService
{
    constructor(private http: HttpClient) {};
    
    url: string = 'api/users';

    getUsers() : Observable<User[]>
    {
        return this.http.get<User[]>(`${environment.apiUrl}/users/authenticate`);
    }

    checkLoggedIn() : boolean
    {
        if (localStorage.getItem('user')) 
        {
            console.log(localStorage.getItem('user'))
            return true;
        } 
        else 
        {
            return false;
        }
    }

    createUser(user: User) : Observable<User>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        user.id = null;
        return this.http.post<User>(this.url, user, {headers});
    }
}