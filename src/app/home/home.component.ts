import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService } from '@app/_services';
import { AdvertService } from '@app/_services/advert.service';
import { Advert } from '@app/_models/advert';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    adverts: Advert[];
    _filterTerm: string = '';

    get filterTerm(): string {
        return this._filterTerm;
    }

    set filterTerm(value: string) {
        this._filterTerm = value;
        //this.filteredAdverts = this.filterTerm ? this.filterAdverts() : this.adverts;  --------Will implement later
    }
    constructor(private userService: UserService, private advertService: AdvertService) { }

    ngOnInit() 
    {
        this.advertService.getAdverts().subscribe({
            next: advert => {
                this.adverts = advert;
            },
            error: err => {
                console.error(err);
            }
        });
    }

    // filterAdverts() : Advert[] ----------Will implement later
    // {
    //     this._filterTerm = this.filterTerm.toLocaleLowerCase();
    //     return this.adverts.filter( (advert: Advert) => {
    //         return ((advert.description.toLocaleLowerCase().indexOf(this._filterTerm) !== -1) || (advert.header.toLocaleLowerCase().indexOf(this._filterTerm) !== -1));
    //     });
    // }
}