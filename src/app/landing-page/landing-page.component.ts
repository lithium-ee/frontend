import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
    constructor(private appService: AppService) {
        this.appService.headerType = 'not-logged-in';
    }
}
