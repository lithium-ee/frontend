import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { ApiService } from '../services/api.service';
import { EventInfoDto } from '../set-up/interfaces/event-info.dto';

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
    public event: EventInfoDto | undefined;

    public getUserEvent(): void {
        this.apiService.getUserEvent().subscribe({
            next: (event: EventInfoDto) => {
                this.event = event;
                this.saveEventToLocalStorage();
            },
            error: (err: any) => {
                console.error(err);
            },
        });
    }

    private saveEventToLocalStorage(): void {
        localStorage.setItem('event', JSON.stringify(this.event));
    }
}
