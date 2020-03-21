import { SignupService } from './signup.service';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserNotTakenValidatorService{

    constructor(private signuService: SignupService) {}

    checkUserNameTaken() {
        return (control : AbstractControl) => {
           return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(userName => 
                    this.signuService.checkUsernameTaken(userName)))
                .pipe(map(isTaken => isTaken ? {userNameTaken:true} : null))
                .pipe(first());
        }
    }
}