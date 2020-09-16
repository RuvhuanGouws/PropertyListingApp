import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AdvertService } from '../../_services/advert.service';
import { Advert } from '../../_models/advert';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-advert-edit',
  templateUrl: './advert-edit.component.html'
})
export class AdvertEditComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Manage Listings';
    advertEditForm: FormGroup;
    private sub: Subscription;
    advert: Advert;
    id: number = 0;
    locations: any;
    provinces: string[] = [];
    cities: string[] = [];

    subs: Subscription[] = [null, null, null];
    private validationMessages: { [key: string]: { [key: string]: string } };
    displayMessage: { [key: string]: string } = {};

    constructor(private advertService: AdvertService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) 
    { 
        this.validationMessages = {
            header: {
                required: 'You have to enter a header.',
                minlength: 'First Name has to be at least 10 characters',
                maxlength: 'First Name cannot be longer than 100 characters'
            },
            description: {
                required: 'Enter a description for your ad.',
                minlength: 'description must be at least 10 characters long.',
                maxlength: 'description cannot be longer than 1000 characters'
            },
            price: {
                required: 'Enter a valid price',
                min: 'Price must be more than R10 000',
                max: 'Price must be more than R100 000 000',
            }
        };
    }

    ngOnInit(): void 
    {
        this.advertEditForm = this.fb.group({
            header: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
            details: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
            price: ['', [Validators.required, Validators.min(10000), Validators.max(100000000)]],
            province: '',
            city: ''
        });

        this.locations = this.advertService.getLocations().subscribe(
            value => {
                this.locations = value;
                console.log(this.locations);
                for (const key in this.locations) {
                    this.provinces.push(key);
                }
            }
        );


        this.sub = this.route.paramMap.subscribe(
            params => {
                this.id = +params.get('id');
                this.getAdvert(this.id);
            }
        );

        const arrControls: string[] = [
            'header',
            'details',
            'price'
        ]

        this.subs = [];

        for (let index = 0; index < arrControls.length; index++) {
            const control = this.advertEditForm.get(arrControls[index]);
            this.subs[index] = (control.valueChanges.pipe(debounceTime(750)).subscribe(
                value => {
                    this.setMessage(control, arrControls[index]);
                }
            ));
        }
    }

    submit(): void
    {
        const ad = { ...this.advert, ...this.advertEditForm.value }

        if (this.id === 0) 
        {
            this.advert = {
                header: this.advertEditForm.get('header').value.trim(),
                details: this.advertEditForm.get('details').value.trim(),
                price: this.advertEditForm.get('price').value, //price field validator automatically prevents any whitespaces
                status: "LIVE",
                userID: JSON.parse(localStorage.getItem('currentUser')).id,
                province: this.advertEditForm.get('province').value,
                city: this.advertEditForm.get('city').value,
            };
            console.log(this.advert);
            this.advertService.createAdvert(this.advert).subscribe({
                next: () => {
                    alert('Advert created successfully! It will be visible to other users and can be edited from the My Adverts sections.');
                    this.advertEditForm.reset();
                    this.router.navigate(['/adverts']);
                },
                error: err => {
                    console.log(err)
                }
            });
        } 
        else 
        {
            this.advertService.updateAdvert(ad).subscribe({
                next: () => {
                    alert('Advert updated successfully!');
                    this.advertEditForm.reset();
                    this.router.navigate(['/adverts']);
                },
                error: err => {
                    console.log(err)
                }
            });
        }
    }

    getAdvert(id: number): void 
    {
        this.advertService.getAdvert(id).subscribe({
            next: (advert: Advert) => {
                this.displayAdvert(advert);
            },
            error: err => {
                console.error(err);
            }
        });
    }

    displayAdvert(advertP: Advert): void 
    {
        if (this.advertEditForm) 
        {
          this.advertEditForm.reset();
        }
        this.advert = advertP;
    
        this.advertEditForm.patchValue({
            header: this.advert.header,
            details: this.advert.details,
            price: this.advert.price,
            province: this.advert.province
        });
        this.updateCities();
        this.advertEditForm.patchValue({
            city: this.advert.city
        });
    }

    setMessage(c: AbstractControl, name: string): void 
    {
        this.displayMessage[name] = '';
        if((c.touched || c.dirty) && c.errors)
        {
            this.displayMessage[name] = Object.keys(c.errors).map(
                key => this.validationMessages[name][key]).join(' ');
        }
    }

    updateCities() : void
    {
        this.cities = this.locations[this.advertEditForm.get('province').value];
    }

    ngOnDestroy(): void 
    {
        this.sub.unsubscribe();
        for (let index = 0; index < this.subs.length; index++) {
            this.subs[index].unsubscribe();    
        }
    }
}
