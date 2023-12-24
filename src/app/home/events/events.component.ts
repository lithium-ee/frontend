import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
})
export class EventsComponent {
    constructor(private router: Router) {}

    public startSetup() {
        // navigate to 'set-up' page
        this.router.navigate(['/set-up']);
    }
}
