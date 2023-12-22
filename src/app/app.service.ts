import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    constructor() {}

    // set auth token to local storage
    setAuthToken(token: string): void {
        localStorage.setItem('authToken', token);
    }

    // get auth token from local storage
    getAuthToken(): string | null {
        return localStorage.getItem('authToken');
    }
}
