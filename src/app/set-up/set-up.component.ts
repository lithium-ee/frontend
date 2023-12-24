import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { SetUpService } from './set-up.service';

@Component({
    selector: 'app-set-up',
    templateUrl: './set-up.component.html',
    styleUrls: ['./set-up.component.scss'],
})
export class SetUpComponent {
    constructor(
        private appService: AppService,
        public setUpService: SetUpService
    ) {
        this.appService.headerType = 'logo-only';
    }
}
