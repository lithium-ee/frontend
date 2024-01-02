import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../home.service';
import { ApiService } from '../../services/api.service';
import { Clipboard } from '@angular/cdk/clipboard';
import {
    Observable,
    Subscription,
    interval,
    startWith,
    switchMap,
    tap,
} from 'rxjs';
import { Song } from './interfaces/song.interface';
import {
    trigger,
    state,
    style,
    transition,
    animate,
} from '@angular/animations';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
    animations: [
        trigger('expandCollapse', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition(
                'expanded <=> collapsed',
                animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')
            ),
        ]),
    ],
})
export class EventsComponent implements OnDestroy {
    constructor(
        private router: Router,
        public homeService: HomeService,
        private apiService: ApiService,
        private clipboard: Clipboard
    ) {
        this.startRequestingInterval = this.homeService
            .getEventForUserFound()
            .subscribe(() => {
                this.startLogsAndRequestsInterval();
            });
    }

    @ViewChild('tooltip') tooltip?: MatTooltip;
    public tooltipText = 'Click to copy';
    public logs: Song[] = [];
    public requests: Song[] = [];
    public showInfo: { [key: string]: string } = {};

    private startRequestingInterval: Subscription;
    private intervalSubscription?: Subscription;

    public toggleInfo(id: string) {
        this.showInfo[id] =
            this.showInfo[id] === 'expanded' ? 'collapsed' : 'expanded';
    }

    public startLogsAndRequestsInterval() {
        this.intervalSubscription = interval(5000)
            .pipe(
                startWith(0),
                switchMap(() => this.fetchLogsAndRequests())
            )
            .subscribe();
    }

    public startSetup() {
        this.router.navigate(['/set-up']);
    }

    private fetchLogsAndRequests() {
        return this.apiService.getLogsAndRequests().pipe(
            tap(res => {
                this.logs = res.logs;
                this.requests = res.requests;
            })
        );
    }

    public copyToClipboard(text: string) {
        this.clipboard.copy(text);
        this.tooltip?.show();

        this.tooltipText = 'URL copied';
        setTimeout(() => {
            this.tooltipText = 'Click to copy';
            this.tooltip?.hide();
        }, 2000);
    }

    public acceptRequest(songId: Song['id']) {
        this.apiService.acceptRequest(songId).subscribe(() => {
            this.fetchLogsAndRequests().subscribe();
        });
    }

    public rejectRequest(songId: Song['id']) {
        this.apiService.rejectRequest(songId).subscribe(() => {
            this.fetchLogsAndRequests().subscribe();
        });
    }

    public suspendUser(songId: string) {
        this.apiService.suspendUser(songId).subscribe(() => {
            this.fetchLogsAndRequests().subscribe();
        });
    }

    ngOnDestroy() {
        if (this.intervalSubscription) {
            this.intervalSubscription.unsubscribe();
        }
        if (this.startRequestingInterval) {
            this.startRequestingInterval.unsubscribe();
        }
    }
}
