import { Component } from '@angular/core';
import { SetUpService } from '../../set-up.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-step-four',
    templateUrl: './step-four.component.html',
    styleUrls: ['./step-four.component.scss'],
})
export class StepFourComponent {
    constructor(
        private setUpService: SetUpService,
        private router: Router
    ) {
        this.setUpService.setProgress((100 / 6) * 4);
    }

    cooldown: {
        hours: number;
        minutes: number;
    } = {
        hours: 0,
        minutes: 0,
    };

    goToNext() {
        // get the input value
        this.setUpService.updateEventInfo({
            cooldown: `${this.cooldown.hours}:${this.cooldown.minutes}`,
        });
        this.router.navigate(['set-up/step-five']);
    }

    public goToPrevious() {
        this.router.navigate(['set-up/step-three']);
    }
}
