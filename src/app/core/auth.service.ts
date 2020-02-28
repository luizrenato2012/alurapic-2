import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const  API = "http://localhost:3000";

@Injectable({
    providedIn : 'root'
})
export class AuthService {

    constructor(private httpClient : HttpClient) {}

    public login (userName : string, password :string) : Observable<any> {
        return this.httpClient.post(API + "/user/login" , 
        {userName, password});
    }
}