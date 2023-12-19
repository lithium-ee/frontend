import { Component } from '@angular/core';
import { InputsObject } from '../assets/interfaces/inputs-object.interface';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
    inputsList: InputsObject[] = [
        {
            name: 'email',
            type: 'email',
            placeholder: 'Enter your email',
            requirements: {
                minLength: 5,
                maxLength: 255,
                required: true,
            },
        },
        {
            name: 'password',
            type: 'password',
            placeholder: 'Enter your password',
            requirements: {
                minLength: 5,
                maxLength: 255,
                required: true,
            },
        },
    ];
}
