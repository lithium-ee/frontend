import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private API_URL = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    public signIn(signInDto: SignInDto): Observable<{ access_token: string }> {
        return this.http.post(
            `${this.API_URL}/auth/sign-in`,
            signInDto
        ) as Observable<{ access_token: string }>;
    }

    public signUp(signUpDto: SignUpDto): Observable<{ access_token: string }> {
        return this.http.post(
            `${this.API_URL}/users`,
            signUpDto
        ) as Observable<{ access_token: string }>;
    }
}
