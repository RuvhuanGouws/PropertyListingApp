import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './authentication/login';;
import { RegisterComponent } from './authentication/register/register.component'
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ApplicationData } from './application-data';
import { AdvertComponent } from './advert/advert.component';
;
import { AdvertEditComponent } from './advert/advert-edit/advert-edit.component';
;
import { AdvertDetailComponent } from './advert/advert-detail/advert-detail.component';
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
        //InMemoryWebApiModule.forRoot(ApplicationData),
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent ,
        AdvertComponent ,
        AdvertEditComponent ,
        AdvertDetailComponent 
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        //fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }