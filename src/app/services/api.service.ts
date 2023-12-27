import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { environment } from '../../../environment';
import { AppService } from '../app.service';
import { EventInfoDto } from '../set-up/interfaces/event-info.dto';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(
        private http: HttpClient,
        private appService: AppService
    ) {}

    public signIn(signInDto: SignInDto): Observable<{ access_token: string }> {
        return this.http.post<{ access_token: string }>(
            `${environment.API_URL}/auth/sign-in`,
            signInDto
        );
    }

    public signUp(signUpDto: SignUpDto): Observable<{ access_token: string }> {
        return this.http.post(
            `${environment.API_URL}/users`,
            signUpDto
        ) as Observable<{ access_token: string }>;
    }

    public connectSpotify(): void {
        const state = this.generateRandomString(16);
        const scope = environment.SCOPE; // Use the scope from the environment file

        const params = new HttpParams()
            .set('response_type', 'code')
            .set('client_id', environment.CLIENT_ID) // Use the client ID from the environment file
            .set('scope', scope)
            .set(
                'redirect_uri',
                `${environment.LOCAL_URL}/set-up/step-two-redirected`
            ) // Use the specified redirect URI
            .set('state', state);

        window.location.href =
            'https://accounts.spotify.com/authorize?' + params.toString();
    }

    public saveCode(code: string): Observable<boolean> {
        const accessToken = this.appService.getAuthToken(); // Get the access token from AppService

        const body = {
            code: code,
            access_token: accessToken,
        };

        return this.http.post(
            `${environment.API_URL}/users/save-code`,
            body
        ) as Observable<boolean>;
    }

    public getActiveDevices(): Observable<any> {
        const accessToken = this.appService.getAuthToken(); // Get the access token from AppService

        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${accessToken}`)
            .set('skipInterceptor', 'true');

        return this.http.get(`${environment.API_URL}/users/active-devices`, {
            headers: headers,
        });
    }

    public setDevice(deviceId: string): Observable<boolean> {
        const accessToken = this.appService.getAuthToken(); // Get the access token
        // put the token in the header
        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${accessToken}`
        );
        return this.http.post(
            `${environment.API_URL}/users/set-device`,
            {
                deviceId: deviceId,
            },
            { headers: headers }
        ) as Observable<boolean>;
    }

    public createEvent(eventInfo: EventInfoDto): Observable<boolean> {
        const accessToken = this.appService.getAuthToken(); // Get the access token
        const body = {
            ...eventInfo,
            cooldown: this.convertToMilliseconds(eventInfo.cooldown),
        };
        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${accessToken}`
        );
        return this.http.post(`${environment.API_URL}/events`, body, {
            headers: headers,
        }) as Observable<boolean>;
    }

    public getUserEvent(): Observable<EventInfoDto> {
        const accessToken = this.appService.getAuthToken(); // Get the access token

        // make request to the API
        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${accessToken}`
        );

        return this.http.get(`${environment.API_URL}/events`, {
            headers: headers,
        }) as Observable<EventInfoDto>;
    }

    public getQueueAndRequests(): Observable<any> {
        const accessToken = this.appService.getAuthToken(); // Get the access token

        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${accessToken}`)
            .set('skipInterceptor', 'true');

        return this.http.get(
            `${environment.API_URL}/events/queue-and-requests`,
            {
                headers: headers,
            }
        ) as Observable<any>;
    }

    private generateRandomString(length: number): string {
        let text = '';
        const possible =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(
                Math.floor(Math.random() * possible.length)
            );
        }

        return text;
    }
    private convertToMilliseconds(time: string): number {
        const [hours, minutes] = time.split(':').map(Number);
        return (hours * 60 * 60 + minutes * 60) * 1000;
    }
}
