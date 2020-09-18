import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Advert } from '@app/_models/advert';
import { AdvertService } from '@app/_services/advert.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-advert-detail',
  templateUrl: './advert-detail.component.html',
  styleUrls: ['./advert-detail.component.less']
})
export class AdvertDetailComponent implements OnInit {
    pageTitle: string = 'Property Details';
    advert: Advert;
    sub: Subscription;
    id: number = 0;
    constructor(private advertService: AdvertService, private route: ActivatedRoute) { }

    ngOnInit(): void 
    {
        this.sub = this.route.paramMap.subscribe(
            params => {
                this.id = +params.get('id');
            }
        );

        this.advertService.getAdvert(this.id).subscribe({
            next: (advert: Advert) => {
                this.advert = advert;
            },
            error: err => {
                console.error(err);
            }
        });
    }

    ngOnDestroy(): void 
    {
        this.sub.unsubscribe();
    }
}
