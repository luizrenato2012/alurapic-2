import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new.user';
import { SignupService } from './signup.service';
import { PlatformDetectorService } from 'src/app/core/palataform/platform-detector.service';


@Component({
    selector : 'ap-signup',
    templateUrl : './signup.component.html'
})
export class SignupComponent implements  OnInit{
    
    signupForm : FormGroup;

    @ViewChild('inputEmail')
    inputEmail : ElementRef<HTMLInputElement>;
    
    constructor(private builder : FormBuilder,
               private userNotTakenValidador : UserNotTakenValidatorService,
               private signUpService : SignupService,
               private router: Router,
               private plataformDetectorService : PlatformDetectorService ){}
    
    ngOnInit(): void {
       this.signupForm = this.builder.group({
           'email' : ['', 
                [Validators.required, 
                Validators.email]
            ],
           'fullName' : ['', 
                [Validators.required, 
                 Validators.minLength(2), 
                 Validators.maxLength(40)]

            ],
           'userName' : ['', 
                [
                  Validators.required, 
                  lowerCaseValidator,
                  Validators.minLength(2), 
                  Validators.maxLength(30)
                ],
                this.userNotTakenValidador.checkUserNameTaken()
            ],
           'password' : ['', 
                [Validators.required,
                 Validators.minLength(8),
                 Validators.maxLength(14)
                ]
            ],
       });
       console.log('Inciando signup');
       //if (this.plataformDetectorService.isPlatformBrower()) {
        this.inputEmail.nativeElement.focus();
       //}
    }

    signUp() {
        let newUser = this.signupForm.getRawValue() as NewUser;
        this.signUpService.signUp(newUser)
            .subscribe(()=> {
                this.router.navigate(['']);
            },error => console.log(error));
    }
}