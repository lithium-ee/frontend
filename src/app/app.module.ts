import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GlowComponent } from './assets/glow/glow.component';
import { HeaderComponent } from './assets/header/header.component';
import { MainButtonComponent } from './assets/main-button/main-button.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { InputsComponent } from './assets/inputs/inputs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './home/events/events.component';
import { AccountComponent } from './home/account/account.component';
import { SetUpComponent } from './set-up/set-up.component';
import { StepOneComponent } from './set-up/steps/step-one/step-one.component';
import { StepTwoComponent } from './set-up/steps/step-two/step-two.component';
import { StepThreeComponent } from './set-up/steps/step-three/step-three.component';
import { ProgressBarComponent } from './assets/progress-bar/progress-bar.component';
import { SecondaryButtonComponent } from './assets/secondary-button/secondary-button.component';
import { StepTwoRedirectedComponent } from './set-up/steps/step-two-redirected/step-two-redirected.component';
import { NoopInterceptor } from './interceptors/noop.interceptor';
import { LoadingComponent } from './assets/loading/loading.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StepFourComponent } from './set-up/steps/step-four/step-four.component';
import { StepFiveComponent } from './set-up/steps/step-five/step-five.component';
import { OverviewComponent } from './set-up/steps/overview/overview.component';

@NgModule({
    declarations: [
        AppComponent,
        LandingPageComponent,
        GlowComponent,
        HeaderComponent,
        MainButtonComponent,
        SignInComponent,
        SignUpComponent,
        InputsComponent,
        HomeComponent,
        EventsComponent,
        AccountComponent,
        SetUpComponent,
        StepOneComponent,
        StepTwoComponent,
        StepThreeComponent,
        ProgressBarComponent,
        SecondaryButtonComponent,
        StepTwoRedirectedComponent,
        LoadingComponent,
        StepFourComponent,
        StepFiveComponent,
        OverviewComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true,
        },
        { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
