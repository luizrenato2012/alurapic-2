import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = "http://localhost:3000";

@Injectable({
    providedIn: 'root'
})
export class SignupService {

    constructor(private httpClient : HttpClient) {}

    checkUsernameTaken(userName : string): Observable<boolean> {
        console.log('Enviando request ' + userName);
        return this.httpClient.get<boolean>(API + "/user/exists/" + userName);
    }

}