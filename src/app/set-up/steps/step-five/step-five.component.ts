import { Component } from '@angular/core';
import { Router } from 'express';
import { SetUpService } from '../../set-up.service';

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
}
