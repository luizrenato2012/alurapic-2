import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';

@Component({
    templateUrl : './signin.component.html'
})
export class SigninComponent implements OnInit{

    loginForm : FormGroup;

    constructor(private builder : FormBuilder,
                private authService : AuthService,
                private router : Router){
    }

    ngOnInit(): void {
        this.loginForm = this.builder.group({
            userName : ['', Validators.required] , //formControl
            password : ['', Validators.required]   //formControl
        });
    }

    login () {
        let userName = this.loginForm.get("userName").value;
        let password = this.loginForm.get("password").value;

        this.authService.login(userName, password)
            .subscribe( ()=> {
                this.router.navigate(['user', userName]); //navega para user/:userName 
            },
            error => {
                console.log(error);
                alert('Erro ao logar \n' + JSON.stringify(error));
            });
    }
}