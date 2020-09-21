import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './_models/user';

@Injectable({
    providedIn: 'root'
})

export class ApplicationData implements InMemoryDbService
{
    constructor() {};
    date: string = new Date().toDateString();
    createDb()
    {
        const users: User[] = [
            {
                "id": 1,
                "firstName": "Ruvhuan",
                "lastName": "Gouws",
                "email": "ruvhuang@gmail.com",
                "password": "Password@1234",
                "admin": false
            },
            {
                "id": 2,
                "firstName": "Elon",
                "lastName": "Musk",
                "email": "elonmusk@gmail.com",
                "password": "Password@1234",
                "admin": false
            },
            {
                "id": 3,
                "firstName": "Tywin",
                "lastName": "Lannister",
                "email": "tywin.lannister@gmail.com",
                "password": "Password@1234",
                "admin": false
            },
            {
                "id": 4,
                "firstName": "Gandalf",
                "lastName": "Stormcrow",
                "email": "whatisanemail@gmail.com",
                "password": "Password@1234",
                "admin": false
            },
            {
                "id": 5,
                "firstName": "James",
                "lastName": "Moriarty",
                "email": "moriarty@gmail.com",
                "password": "Password@1234",
                "admin": false
            }
        ]
        return { users };
    }
}