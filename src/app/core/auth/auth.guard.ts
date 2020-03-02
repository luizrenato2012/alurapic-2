import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private userService : UserService,
                private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) : boolean | 
        Observable<boolean>  {
        if ( this.userService.isLoged()) {
            let userName = this.userService.getUserName();
            this.router.navigate(['user', userName]);
            return false;
        }
        return true;
    }

}