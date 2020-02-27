
import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/sigin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';

@NgModule({
    declarations: [SigninComponent],
    imports : [
        CommonModule,
        ReactiveFormsModule,
        VMessageModule
    ]
})
export class HomeModule {
}
