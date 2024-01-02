import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { environment } from 'src/env/environment';

export const AuthGuard: CanActivateFn = () => {
    const token = localStorage.getItem('access_token');
    const router = inject(Router);

    if (!token) {
        // If there's no token, return an Observable that emits false
        router.navigate(['']);
        return of(false);
    }

    // If there's a token, send it to the server for verification
    return inject(HttpClient)
        .post<boolean>(`${environment['API_URL']}/auth/verify-token`, {
            access_token: token,
        })
        .pipe(
            map(response => {
                // If the server responds with a success status, return true
                return response;
            }),
            catchError(error => {
                // If the server responds with an error status, return false
                console.log(error);
                router.navigate(['']);
                return of(false);
            })
        );
};
