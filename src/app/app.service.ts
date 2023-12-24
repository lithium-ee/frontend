import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    constructor(private router: Router) {}

    // set auth token to local storage
    setAuthToken(token: string): void {
        localStorage.setItem('access_token', token);
    }

    // get auth token from local storage
    getAuthToken(): string | null {
        return localStorage.getItem('access_token');
    }

    public headerType: 'not-logged-in' | 'logged-in' | 'logo-only' =
        'not-logged-in';

    // log out
    public logout(): void {
        localStorage.removeItem('access_token');
        this.router.navigate(['/']);
    }
}
