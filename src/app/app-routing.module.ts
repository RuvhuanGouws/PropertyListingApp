import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './authentication/login';
import { AuthGuard } from './_helpers'; 
import { RegisterComponent } from './authentication/register/register.component';
import { AdvertComponent } from './advert/advert.component';
import { AuthenticationService } from './_services';

const routes: Routes = [
    //Add relevant guards --------------------------------------------
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'adverts', component: AdvertComponent, canActivate: [AuthGuard] },

    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
