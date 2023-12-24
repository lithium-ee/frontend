import { Component, ViewChild } from '@angular/core';
import { InputsObject } from '../assets/interfaces/inputs-object.interface';
import { InputsComponent } from '../assets/inputs/inputs.component';
import { ApiService } from '../services/api.service';
import { SignInDto } from '../services/dto/sign-in.dto';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
    constructor(
        private apiService: ApiService,
        private readonly appService: AppService,
        private router: Router
    ) {}

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
                minLength: 0,
                maxLength: 255,
                required: true,
            },
        },
    ];

    @ViewChild(InputsComponent) inputsComponent!: InputsComponent;
    public errorMessage: string = '';
    onSubmit(values: SignInDto) {
        this.apiService.signIn(values).subscribe({
            next: response => {
                this.errorMessage = '';
                this.appService.setAuthToken(response.access_token);
                // navigate to home page
                this.router.navigate(['home']);
            },
            error: err => {
                this.errorMessage = err.error.message;
            },
        });
    }
}
