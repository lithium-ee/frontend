import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-main-button',
    templateUrl: './main-button.component.html',
    styleUrls: ['./main-button.component.scss'],
})
export class MainButtonComponent {
    @Input() text = '';
    @Input() size: 'small' | 'medium' | 'large' = 'small';
}
