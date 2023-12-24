import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    constructor(private appService: AppService) {
        this.appService.headerType = 'logged-in';
    }
}
