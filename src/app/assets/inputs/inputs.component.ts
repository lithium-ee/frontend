import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputsObject } from '../interfaces/inputs-object.interface';
import {
    FormControl,
    FormGroup,
    ValidatorFn,
    Validators,
} from '@angular/forms';

export class AppModule {}
@Component({
    selector: 'app-inputs',
    templateUrl: './inputs.component.html',
    styleUrls: ['./inputs.component.scss'],
})
export class InputsComponent implements OnInit {
    @Input() inputsList: InputsObject[] = [];
    @Input() apiErrorMessage: string = '';
    @Output() formSubmit = new EventEmitter<any>();

    showPassword: { [key: number]: boolean } = {};

    onSubmit(): void {
        this.submitted = true;
        if (this.formGroup.invalid) {
            return;
        }
        this.formSubmit.emit(this.formGroup.value);
    }

    toggleShowPassword(index: number) {
        this.showPassword[index] = !this.showPassword[index];
        console.log(this.showPassword);
    }

    formGroup!: FormGroup;
    submitted: boolean = false;

    ngOnInit() {
        const group: { [key: string]: FormControl } = {};
        this.inputsList.forEach(input => {
            let validators: ValidatorFn[] = [];

            if (input.requirements?.hasToMatch || input.type === 'email') {
                if (input.requirements?.hasToMatch) {
                    // Add your custom validator for hasToMatch here
                }
                if (input.type === 'email') {
                    validators = [
                        Validators.email,
                        ...(input.requirements?.required
                            ? [Validators.required]
                            : []),
                    ];
                }
            } else {
                validators = [
                    ...(input.requirements?.required
                        ? [Validators.required]
                        : []),
                    ...(input.requirements?.minLength
                        ? [Validators.minLength(input.requirements.minLength)]
                        : []),
                    ...(input.requirements?.maxLength
                        ? [Validators.maxLength(input.requirements.maxLength)]
                        : []),
                ];
            }

            group[input.name] = new FormControl('', validators);
        });
        this.formGroup = new FormGroup(group);

        this.inputsList.forEach(input => {
            if (input.requirements?.hasToMatch) {
                const hasToMatch = input.requirements.hasToMatch;
                const control = this.formGroup.controls[input.name];
                const hasToMatchControl = this.formGroup.controls[hasToMatch];

                const validate = () => {
                    if (control.value !== hasToMatchControl.value) {
                        control.setErrors({
                            ...control.errors,
                            hasToMatch: true,
                        });
                    } else {
                        if (control.errors && control.errors['hasToMatch']) {
                            delete control.errors['hasToMatch'];
                            if (!Object.keys(control.errors).length) {
                                control.setErrors(null);
                            }
                        }
                    }
                };

                control.valueChanges.subscribe(validate);
                hasToMatchControl.valueChanges.subscribe(validate);
            }
        });
    }
}
