import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { Subscription, filter } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    currentPath: string = '';
    navigationSubscription: Subscription = new Subscription();

    constructor(
        private router: Router,
        public appService: AppService
    ) {}

    ngOnInit() {
        this.navigationSubscription = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: any) => {
                this.currentPath = event.urlAfterRedirects.split('/')[2];
            });
    }

    ngOnDestroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }
    // input that is given from the parent component with values 'not-logged-in' , 'logged-in', 'logo-only'
    @Input() headerType: 'not-logged-in' | 'logged-in' | 'logo-only' =
        'not-logged-in';

    goToSignUp() {
        this.router.navigate(['/sign-up']);
    }

    navigateTo(path: string) {
        this.router.navigate(['home/', path]);
    }
}
