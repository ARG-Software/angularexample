import { Validators, AbstractControl } from '@angular/forms';

export class MimsValidator extends Validators {
    public static isNumber(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value !== undefined && (isNaN(control.value))) {
            return { isNumber: true };
        }
        return null;
    }
}
