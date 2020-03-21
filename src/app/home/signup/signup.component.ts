import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';


@Component({
    selector : 'ap-signup',
    templateUrl : './signup.component.html'
})
export class SignupComponent implements  OnInit{
    
    signupForm : FormGroup;
    
    constructor(private builder : FormBuilder,
               private userNotTakenValidador : UserNotTakenValidatorService ){}
    
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
                  //Validators.pattern(/^[a-z0-9_\-]+$/),
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
    }
}