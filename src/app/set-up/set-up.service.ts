import { Injectable } from '@angular/core';
import { EventInfoDto } from './interfaces/event-info.dto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SetUpService {
    constructor() {
        // Load eventInfo from localStorage when the service is instantiated
        const storedEventInfo = localStorage.getItem('eventInfo');
        if (storedEventInfo) {
            this.eventInfo = JSON.parse(storedEventInfo);
        }
    }
    private progressSubject = new BehaviorSubject<number>(0);
    progress$ = this.progressSubject.asObservable();

    public eventInfo: EventInfoDto = {
        eventName: '',
        device: undefined,
        cooldown: '0:0',
        filteringOn: false,
    };

    public setProgress(value: number) {
        this.progressSubject.next(value);
    }

    public updateEventInfo(eventInfo: Partial<EventInfoDto>) {
        console.log(eventInfo);
        console.log(this.eventInfo);
        this.eventInfo = { ...this.eventInfo, ...eventInfo };
        console.log(this.eventInfo);
        localStorage.setItem('eventInfo', JSON.stringify(this.eventInfo));
    }
}
