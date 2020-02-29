import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/palataform/platform-detector.service';

@Component({
    templateUrl : './signin.component.html'
})
export class SigninComponent implements OnInit{

    loginForm : FormGroup;

    @ViewChild("userNameInput")
    userNameInput : ElementRef<HTMLInputElement>;

    constructor(private builder : FormBuilder,
                private authService : AuthService,
                private router : Router,
                private platformDetectorService : PlatformDetectorService){
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
                // atalho pra q a 2a instrução só seja executa com o 1a true sem usar if
                if (this.platformDetectorService.isPlatformBrower()) {
                  this.userNameInput.nativeElement.focus();
                }
            });
    }
}