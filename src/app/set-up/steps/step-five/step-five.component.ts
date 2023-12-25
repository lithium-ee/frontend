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
        console.log(this.setUpService.eventInfo);
    }

    public filteringOn: boolean = this.setUpService.eventInfo.filteringOn;

    public toggleFiltering() {
        this.filteringOn = !this.filteringOn;
        this.setUpService.updateEventInfo({
            filteringOn: this.filteringOn,
        });
    }

    public goToNext() {
        this.router.navigate(['/set-up/overview']);
    }

    public goToPrevious() {
        this.router.navigate(['/set-up/step-four']);
    }
}
