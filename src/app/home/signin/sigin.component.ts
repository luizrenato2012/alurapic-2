import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    templateUrl : './signin.component.html'
})
export class SigninComponent implements OnInit{

    loginForm : FormGroup;

    constructor(private builder : FormBuilder){
    }

    ngOnInit(): void {
        this.loginForm = this.builder.group({
            userName : ['', Validators.required] , //formControl
            password : ['', Validators.required]   //formControl
        });
    }
}