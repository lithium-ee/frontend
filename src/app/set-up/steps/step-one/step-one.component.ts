import { Component } from '@angular/core';
import { SetUpService } from '../../set-up.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-step-one',
    templateUrl: './step-one.component.html',
    styleUrls: ['./step-one.component.scss'],
})
export class StepOneComponent {
    constructor(
        public setUpService: SetUpService,
        private router: Router
    ) {
        this.setUpService.setProgress(0);
    }

    onSubmit(obj: { [key: string]: any }) {
        this.setUpService.updateEventInfo(obj as { eventName: string });
        // redirect to step two
        this.router.navigate(['/set-up/step-two']);
    }

    goToHome() {
        this.router.navigate(['home']);
    }
}
