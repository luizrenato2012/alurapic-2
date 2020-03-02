import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

import { TokenService } from '../token/token.service';
import { User } from './user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private subject = new BehaviorSubject<User>(null);
    private userName : string="";

    constructor(private tokenService : TokenService){
        this.tokenService.hasToken() && this.decodeAndNotify();
    }

    setToken(token : string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }

    private decodeAndNotify() {
        let token = this.tokenService.getToken();
        let user = jwt_decode(token) as User;
        this.userName = user.name;
        this.subject.next(user);
    }

    getUser() {
        return this.subject.asObservable();
    }

    public logout() {
        this.tokenService.removeToken();
        this.subject.next(null);
    }

    isLoged() {
        return this.tokenService.hasToken();
    }

    getUserName() {
        return this.userName;
    }

}