import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileComponent } from './profile.component';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanDeactivate<unknown> {
  
    canDeactivate(component: ProfileComponent): Observable<boolean> | Promise<boolean> | boolean 
    {
        if (component.profileForm.dirty) 
        {
            return confirm(`Navigate away and lose all changes?`);
        }
        return true;
    }
  
}
