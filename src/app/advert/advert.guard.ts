import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdvertEditComponent } from './advert-edit/advert-edit.component'

@Injectable({
  providedIn: 'root'
})
export class AdvertGuard implements CanDeactivate<unknown> {
    canDeactivate(component: AdvertEditComponent): Observable<boolean> | Promise<boolean> | boolean 
    {
        if (component.advertEditForm.dirty) 
        {
            const advertHeader = component.advertEditForm.get('header').value || 'New Advert';
            return confirm(`Navigate away and lose all changes to ${advertHeader}?`);
        }
        return true;
    }
}
