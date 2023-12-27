import { Component } from '@angular/core';
import { SetUpService } from '../../set-up.service';
import { Router } from '@angular/router';
import { OverViewField } from '../../interfaces/overview-field.interface';
import { EventInfoDto } from '../../interfaces/event-info.dto';
import { ApiService } from '../../../services/api.service';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
    constructor(
        private setUpService: SetUpService,
        private router: Router,
        private apiService: ApiService
    ) {
        this.setUpService.setProgress((100 / 6) * 6);
        this.overviewFields = this.generateOverviewFields(
            this.setUpService.eventInfo
        );
    }

    private generateOverviewFields(eventInfo: EventInfoDto): OverViewField[] {
        // Define the labels for the keys
        const labels: { [key: string]: string } = {
            name: 'Event name',
            device: 'Play on device',
            cooldown: 'timeout users for',
            filterSongs: 'filter song requests',
            // Add more labels as needed
        };

        // Convert eventInfo to an array of objects with label and value properties
        return Object.entries(eventInfo).map(([key, value]) => {
            return { label: labels[key], value: this.adaptValue(key, value) };
        });
    }

    private adaptValue(key: string, value: any): any {
        switch (key) {
            case 'cooldown':
                const [hours, minutes] = value.split(':').map(Number);
                if (hours === 0 && minutes === 0) {
                    return '0';
                } else if (minutes === 0) {
                    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
                } else {
                    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
                }
            case 'filterSongs':
                // Convert the filterSongs boolean to a user-friendly string
                return value ? 'On' : 'Off';
            // Add more cases as needed
            case 'device':
                // Convert the deviceId boolean to a user-friendly string
                return value ? value.name : 'Not defined';

            // Add more cases as needed
            default:
                // By default, return the value as is
                return value;
        }
    }

    public overviewFields: OverViewField[] = [];
    public error: string = '';

    public createEvent() {
        this.apiService.createEvent(this.setUpService.eventInfo).subscribe({
            next: () => {
                this.setUpService.deleteSetUpDataFromLocalStorage();
                this.router.navigate(['/home']);
            },
            error: (err: any) => {
                this.error = err.error.message;
            },
        });
    }

    public goToPrevious() {
        this.router.navigate(['/set-up/step-five']);
    }
}
