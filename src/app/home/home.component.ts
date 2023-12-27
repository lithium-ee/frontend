import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { AppService } from '../app.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    constructor(
        private homeService: HomeService,
        private appService: AppService
    ) {
        this.appService.headerType = 'logged-in';
        this.homeService.getUserEvent();
    }
}
