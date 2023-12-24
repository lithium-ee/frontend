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

    cooldown?: number;

    goToNext() {
        // get the input value
        this.setUpService.updateEventInfo({
            cooldown: this.cooldown,
        });

        // this.router.navigate(['set-up/step-five']);
    }

    public goToBack() {
        // this.router.navigate(['set-up/step-three']);
    }
}
