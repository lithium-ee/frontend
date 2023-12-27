import { Injectable } from '@angular/core';
import { EventInfoDto } from './interfaces/event-info.dto';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class SetUpService {
    constructor(private router: Router) {
        const storedEventInfo = localStorage.getItem('eventInfo');
        if (storedEventInfo) {
            this.eventInfo = JSON.parse(storedEventInfo);
        }
        const storedEvent = localStorage.getItem('event');
        if (storedEvent !== 'null') {
            this.router.navigate(['/home']);
        }
    }
    private progressSubject = new BehaviorSubject<number>(0);
    progress$ = this.progressSubject.asObservable();

    public eventInfo: EventInfoDto = {
        name: '',
        device: undefined,
        cooldown: '0:0',
        filterSongs: false,
    };

    public setProgress(value: number) {
        this.progressSubject.next(value);
    }

    public updateEventInfo(eventInfo: Partial<EventInfoDto>) {
        this.eventInfo = { ...this.eventInfo, ...eventInfo };
        localStorage.setItem('eventInfo', JSON.stringify(this.eventInfo));
    }

    public deleteSetUpDataFromLocalStorage(): void {
        localStorage.removeItem('eventInfo');
    }
}
