import { Component } from '@angular/core';
import { InputsObject } from '../assets/interfaces/inputs-object.interface';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
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
}
