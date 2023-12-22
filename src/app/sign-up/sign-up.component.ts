import { Component, ViewChild } from '@angular/core';
import { InputsObject } from '../assets/interfaces/inputs-object.interface';
import { InputsComponent } from '../assets/inputs/inputs.component';
import { ApiService } from '../services/api.service';
import { SignUpDto } from '../services/dto/sign-up.dto';
import { AppService } from '../app.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
    constructor(
        private readonly apiService: ApiService,
        private readonly appService: AppService
    ) {}

    public errorMessage: string = '';

    inputsList: InputsObject[] = [
        {
            name: 'email',
            type: 'email',
            placeholder: 'Enter your email',
            requirements: {
                minLength: 5,
                isEmail: true,
                maxLength: 255,
                required: true,
            },
        },
        {
            name: 'username',
            type: 'text',
            placeholder: 'Enter your username',
            requirements: {
                minLength: 5,
                isEmail: false,
                maxLength: 32,
                required: true,
            },
        },
        {
            name: 'password1',
            type: 'password',
            placeholder: 'Enter your password',
            requirements: {
                minLength: 5,
                maxLength: 255,
                required: true,
            },
        },
        {
            name: 'password2',
            type: 'password',
            placeholder: 'Repeat your password',
            requirements: {
                minLength: 5,
                maxLength: 255,
                required: true,
                hasToMatch: 'password1',
            },
        },
    ];

    onSubmit(values: { [key: string]: string }) {
        this.apiService
            .signUp({
                email: values['email'],
                username: values['username'],
                password: values['password1'],
            })
            .subscribe({
                next: response => {
                    this.errorMessage = '';
                    this.appService.setAuthToken(response.access_token);
                },
                error: err => {
                    this.errorMessage = err.error.message;
                },
            });
    }
}
