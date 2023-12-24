import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit, OnDestroy {
    @Input() progress!: Observable<number>;
    progressValue!: number;
    private subscription!: Subscription;

    ngOnInit() {
        this.subscription = this.progress.subscribe(value => {
            this.progressValue = value;
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
