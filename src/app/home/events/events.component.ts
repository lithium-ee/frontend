import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../home.service';
import { ApiService } from '../../services/api.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { interval, switchMap, map } from 'rxjs';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('600ms', style({ opacity: 1 })),
            ]),
        ]),
    ],
})
export class EventsComponent {
    constructor(
        private router: Router,
        public homeService: HomeService,
        private apiService: ApiService
    ) {
        interval(5000)
            .pipe(
                switchMap(() => this.apiService.getQueueAndRequests()),
                map(res => {
                    const newQueue = res.queue.map(
                        (item: { name: string; artists: string[] }) => {
                            const artists = item.artists.join(' and ');
                            return { ...item, artists };
                        }
                    );

                    // Remove songs that are no longer in the queue
                    this.queue = this.queue.filter(song =>
                        newQueue.some(
                            (item: { name: string; artists: string[] }) =>
                                item.name === song.name &&
                                item.artists === song.artists
                        )
                    );

                    // Add new songs to the queue
                    newQueue.forEach(
                        (
                            item: { name: string; artists: string },
                            index: number
                        ) => {
                            if (
                                !this.queue.some(
                                    song =>
                                        song.name === item.name &&
                                        song.artists === item.artists
                                )
                            ) {
                                // Add the song at the correct position
                                this.queue.splice(index, 0, item);
                            }
                        }
                    );

                    this.requests = res.requests;
                })
            )
            .subscribe();
    }

    public queue: any[] = [];
    public requests: any[] = [];

    public startSetup() {
        // navigate to 'set-up' page
        this.router.navigate(['/set-up']);
    }
}
