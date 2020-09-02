import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    users: User[];
    _filterTerm: string = '';

    get filterTerm(): string {
        return this._filterTerm;
    }

    set filterTerm(value: string) {
        this._filterTerm = value;
        //this.filteredAdverts = this.filterTerm ? this.filterAdverts() : this.adverts;  --------Will implement later
    }
    constructor(private userService: UserService) { }

    ngOnInit() {
        
    }

    // filterAdverts() : Advert[] ----------Will implement later
    // {
    //     this._filterTerm = this.filterTerm.toLocaleLowerCase();
    //     return this.adverts.filter( (advert: Advert) => {
    //         return ((advert.description.toLocaleLowerCase().indexOf(this._filterTerm) !== -1) || (advert.header.toLocaleLowerCase().indexOf(this._filterTerm) !== -1));
    //     });
    // }
}