import { Component } from '@angular/core';
import { SetUpService } from '../../set-up.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-step-five',
    templateUrl: './step-five.component.html',
    styleUrls: ['./step-five.component.scss'],
})
export class StepFiveComponent {
    constructor(
        private setUpService: SetUpService,
        private router: Router
    ) {
        this.setUpService.setProgress((100 / 6) * 5);
    }

    public filterSongs: boolean = this.setUpService.eventInfo.filterSongs;

    public toggleFiltering() {
        this.filterSongs = !this.filterSongs;
        this.setUpService.updateEventInfo({
            filterSongs: this.filterSongs,
        });
    }

    public goToNext() {
        this.router.navigate(['/set-up/overview']);
    }

    public goToPrevious() {
        this.router.navigate(['/set-up/step-four']);
    }
}
