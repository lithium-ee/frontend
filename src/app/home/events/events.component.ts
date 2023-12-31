import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../home.service';
import { ApiService } from '../../services/api.service';
import { interval, switchMap, tap } from 'rxjs';
import { Song } from './interfaces/song.interface';
import {
    trigger,
    state,
    style,
    transition,
    animate,
} from '@angular/animations';

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
export class EventsComponent implements OnInit {
    constructor(
        private router: Router,
        public homeService: HomeService,
        private apiService: ApiService
    ) {
        if (!this.homeService.event) return;
        interval(5000)
            .pipe(switchMap(() => this.fetchLogsAndRequests()))
            .subscribe();
    }

    ngOnInit(): void {
        if (!this.homeService.event) return;
        this.fetchLogsAndRequests().subscribe();
    }

    public showInfo: { [key: string]: string } = {};

    toggleInfo(id: string) {
        this.showInfo[id] =
            this.showInfo[id] === 'expanded' ? 'collapsed' : 'expanded';
    }

    public logs: Song[] = [];
    public requests: Song[] = [];
    url: string = '';

    public startSetup() {
        // navigate to 'set-up' page
        this.router.navigate(['/set-up']);
    }

    fetchLogsAndRequests() {
        return this.apiService.getLogsAndRequests().pipe(
            tap(res => {
                this.logs = res.logs;
                this.requests = res.requests;
            })
        );
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
}
