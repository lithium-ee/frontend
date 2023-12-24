import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    Subscription,
    delay,
    filter,
    map,
    merge,
    of,
    pairwise,
    startWith,
    switchMap,
    tap,
} from 'rxjs';
import { LoadingService } from './loading.service';
import {
    trigger,
    state,
    style,
    transition,
    animate,
} from '@angular/animations';
import { NavigationStart, NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
    animations: [
        trigger('fade', [
            state('true', style({ opacity: 1 })),
            state('false', style({ opacity: 0 })),
            transition('true => false', animate('100ms')),
        ]),
    ],
})
export class LoadingComponent implements OnInit, OnDestroy {
    loading: boolean = false;
    visible: boolean = false;
    private loadingSubscription!: Subscription;
    private routerSubscription!: Subscription;

    constructor(
        private loadingService: LoadingService,
        private router: Router
    ) {}

    ngOnInit() {
        const loadingStart$ = this.loadingService.loading$.pipe(
            filter(loading => loading),
            map(() => {
                this.visible = true;
                return true;
            })
        );

        const loadingEnd$ = this.loadingService.loading$.pipe(
            filter(loading => !loading),
            switchMap(() => of(false).pipe(delay(200))),
            tap(() => {
                setTimeout(() => {
                    this.visible = false;
                }, 200); // delay setting visible to false
            })
        );

        this.loadingSubscription = merge(loadingStart$, loadingEnd$)
            .pipe(startWith(false))
            .subscribe(loading => (this.loading = loading));

        // this.routerSubscription = this.router.events
        //     .pipe(
        //         filter(
        //             event =>
        //                 event instanceof NavigationStart ||
        //                 event instanceof NavigationEnd
        //         ),
        //         pairwise()
        //     )
        //     .subscribe(([prevEvent, currEvent]: [Event, Event]) => {
        //         if (
        //             prevEvent instanceof NavigationStart &&
        //             currEvent instanceof NavigationStart
        //         ) {
        //             const prevUrlSegment = prevEvent.url.split('/')[1];
        //             const currUrlSegment = currEvent.url.split('/')[1];

        //             if (prevUrlSegment !== currUrlSegment) {
        //                 this.loading = true;
        //                 this.visible = true;
        //             }
        //         } else if (currEvent instanceof NavigationEnd) {
        //             setTimeout(() => (this.loading = false), 400);
        //             setTimeout(() => (this.visible = false), 600);
        //         }
        //     });
    }

    ngOnDestroy() {
        if (this.loadingSubscription) {
            this.loadingSubscription.unsubscribe();
        }
    }
}
