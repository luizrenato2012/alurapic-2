import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../token/token.service';

const  API = "http://localhost:3000";

@Injectable({
    providedIn : 'root'
})
export class AuthService {

    constructor(private httpClient : HttpClient,
                private tokenService : TokenService) {}

    public login (userName : string, password :string) : Observable<any> {
        return this.httpClient
            .post(API + "/user/login" , {userName, password} , {observe : 'response'})
                .pipe (
                    tap (res=> this.tokenService.setToken(res.headers.get( 'x-access-token')))
                );
    }
}