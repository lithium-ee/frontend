import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { ApiService } from '../services/api.service';
import {
    EventInfoDto,
    ExtendedEventInfoDto,
} from '../set-up/interfaces/event-info.dto';
import { environment } from '../../env/environment';
import { Observable, Subject, interval, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    constructor(
        private appService: AppService,
        private apiService: ApiService
    ) {
        this.appService.headerType = 'logged-in';
    }
    public event: ExtendedEventInfoDto | undefined;
    public clientUrl: string = '';

    public getUserEvent(): void {
        this.apiService.getUserEvent().subscribe({
            next: (event: ExtendedEventInfoDto) => {
                this.event = event;
                this.clientUrl = event
                    ? environment.CLIENT_URL + '/init?e=' + event.id
                    : '';
                this.saveEventToLocalStorage();
                this.eventFound.next();
            },
            error: (err: any) => {
                console.error(err);
            },
        });
    }

    private eventFound = new Subject<void>();

    getEventForUserFound(): Observable<void> {
        return this.eventFound.asObservable();
    }

    private saveEventToLocalStorage(): void {
        localStorage.setItem('event', JSON.stringify(this.event));
    }
}
