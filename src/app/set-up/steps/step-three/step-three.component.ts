import { Component, OnDestroy, OnInit } from '@angular/core';
import { SetUpService } from '../../set-up.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Subject, catchError, of, takeUntil } from 'rxjs';
import { Device } from '../../interfaces/device.interface';
import { trigger, transition, style, animate } from '@angular/animations';
import { EventInfoDto } from '../../interfaces/event-info.dto';

@Component({
    selector: 'app-step-three',
    templateUrl: './step-three.component.html',
    styleUrls: ['./step-three.component.scss'],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('0.5s ease-in', style({ opacity: 1 })),
            ]),
            transition(':leave', [
                animate('0.5s ease-out', style({ opacity: 0 })),
            ]),
        ]),
    ],
})
export class StepThreeComponent implements OnInit, OnDestroy {
    constructor(
        private setUpService: SetUpService,
        private router: Router,
        private apiService: ApiService
    ) {
        this.setUpService.setProgress((100 / 6) * 3);
    }

    private destroy$ = new Subject<void>();
    private intervalId?: number;
    public devices: Device[] = [];
    public chosenDevice: EventInfoDto['device'] = undefined;

    ngOnInit() {
        this.getActiveDevices();
        this.intervalId = window.setInterval(() => {
            this.getActiveDevices();
        }, 5000);
    }

    public chooseDevice(device: Device) {
        this.chosenDevice?.id === device.id
            ? (this.chosenDevice = undefined)
            : (this.chosenDevice = {
                  id: device.id,
                  name: device.name,
              });
    }

    public goToNext() {
        this.setUpService.updateEventInfo({
            device: this.chosenDevice,
        });
        this.router.navigate(['/set-up/step-four']);
    }

    public goBack() {
        this.router.navigate(['/set-up/step-two']);
    }

    private getActiveDevices(): void {
        this.apiService
            .getActiveDevices()
            .pipe(takeUntil(this.destroy$))
            .subscribe((activeDevices: Device[]) => {
                const newDevices = activeDevices.filter(
                    activeDevice =>
                        !this.devices.some(
                            device => device.id === activeDevice.id
                        )
                );
                this.devices = this.devices.concat(newDevices);

                // Remove inactive devices
                this.devices = this.devices.filter(device =>
                    activeDevices.some(
                        activeDevice => activeDevice.id === device.id
                    )
                );
            });
    }

    ngOnDestroy() {
        if (this.intervalId) {
            window.clearInterval(this.intervalId);
        }
        this.destroy$.next();
        this.destroy$.complete();
    }
}
