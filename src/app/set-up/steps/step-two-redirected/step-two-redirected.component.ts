import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
    selector: 'app-step-two-redirected',
    templateUrl: './step-two-redirected.component.html',
    styleUrls: ['./step-two-redirected.component.scss'],
})
export class StepTwoRedirectedComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public apiService: ApiService
    ) {}

    code: string | null = '';
    success: boolean = false;
    ngOnInit() {
        this.code = this.route.snapshot.queryParamMap.get('code');
        if (this.code) {
            this.apiService.saveCode(this.code).subscribe({
                next: res => {
                    this.success = res;
                },
                error: () => {
                    this.success = false;
                },
            });
        }
    }

    goToNext() {
        this.router.navigate(['/set-up/step-three']);
    }

    goBack() {
        this.router.navigate(['/set-up/step-one']);
    }
}
