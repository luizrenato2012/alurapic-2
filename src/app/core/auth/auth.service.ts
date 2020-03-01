import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';

const  API = "http://localhost:3000";

@Injectable({
    providedIn : 'root'
})
export class AuthService {

    constructor(private httpClient : HttpClient,
                private userService : UserService) {}

    public login (userName : string, password :string) : Observable<any> {
        return this.httpClient
            .post(API + "/user/login" , {userName, password} , {observe : 'response'})
                .pipe (
                    tap (res=> this.userService.setToken(res.headers.get( 'x-access-token')))
                );
    }

}