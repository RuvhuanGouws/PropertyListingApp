import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Advert } from '../_models/advert';
import { AdvertService } from '../_services/advert.service'
@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.less']
})
export class AdvertComponent implements OnInit {
    pageTitle: string = 'Manage Adverts';

    mySubscription: any;
    adverts: Advert[] = [];
    filteredAdverts: Advert[] = [];
    
    constructor(private advertService: AdvertService, private router: Router, private fb: FormBuilder) { }

    ngOnInit(): void 
    {
        this.refresh();
    }

    refresh() : void
    {
        this.advertService.getAdverts().subscribe({
            next: advert => {
                this.adverts = advert;
                this.filteredAdverts = this.adverts.filter( advert => {
                    return (advert.userID === JSON.parse(localStorage.getItem('currentUser')).id)
                });
            },
            error: err => {
                console.error(err);
            }
        });
    }
    
    deleteAdvert(id: number, advert: Advert) : void
    {
        if (confirm(`Delete the advert: ${advert.header}?`))
        {
            this.advertService.deleteAdvert(id).subscribe({
                next: () => {
                    alert('Advert Deleted!'); //temp 
                    this.refresh();
                },
                error: err => {
                    console.error(err);
                }
            });
        }
    }

    changeStatus(advert: Advert) : void
    {
        if(advert.status == "LIVE")
        {
            advert.status = "HIDDEN";
            this.advertService.updateAdvert(advert).subscribe({
                next: () => {
                    this.router.navigate(['/adverts']);
                    this.refresh();
                },
                error: err => {
                    console.log(err)
                }
            });
        }
        else if (advert.status == "HIDDEN"){
            advert.status = "LIVE";
            this.advertService.updateAdvert(advert).subscribe({
                next: () => {
                    this.router.navigate(['/adverts']);
                    this.refresh();
                },
                error: err => {
                    console.log(err)
                }
            });
        }
    }
}
