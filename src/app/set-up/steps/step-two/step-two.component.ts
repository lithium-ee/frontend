import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SetUpService } from '../../set-up.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
    selector: 'app-step-two',
    templateUrl: './step-two.component.html',
    styleUrls: ['./step-two.component.scss'],
})
export class StepTwoComponent implements AfterViewInit {
    constructor(
        private setUpService: SetUpService,
        private router: Router,
        public apiService: ApiService
    ) {
        this.setUpService.setProgress(100 / 6);
    }

    ngAfterViewInit() {
        // Add this method
        this.setUpService.setProgress(100 / 6);
    }

    goBack() {
        this.router.navigate(['/set-up/step-one']);
    }
}
