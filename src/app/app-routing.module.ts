import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { EventsComponent } from './home/events/events.component';
import { AccountComponent } from './home/account/account.component';
import { SetUpComponent } from './set-up/set-up.component';
import { StepOneComponent } from './set-up/steps/step-one/step-one.component';
import { StepTwoComponent } from './set-up/steps/step-two/step-two.component';
import { StepThreeComponent } from './set-up/steps/step-three/step-three.component';
import { StepTwoRedirectedComponent } from './set-up/steps/step-two-redirected/step-two-redirected.component';
import { StepFourComponent } from './set-up/steps/step-four/step-four.component';
import { StepFiveComponent } from './set-up/steps/step-five/step-five.component';
import { OverviewComponent } from './set-up/steps/overview/overview.component';

const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'events', pathMatch: 'full' },
            { path: 'events', component: EventsComponent },
            { path: 'account', component: AccountComponent },
        ],
    },
    {
        path: 'set-up',
        component: SetUpComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'step-one', pathMatch: 'full' },
            { path: 'step-one', component: StepOneComponent },
            { path: 'step-two', component: StepTwoComponent },
            {
                path: 'step-two-redirected',
                component: StepTwoRedirectedComponent,
            },
            { path: 'step-three', component: StepThreeComponent },
            { path: 'step-four', component: StepFourComponent },
            { path: 'step-five', component: StepFiveComponent },
            { path: 'overview', component: OverviewComponent },
        ],
    },
    { path: '**', component: LandingPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
