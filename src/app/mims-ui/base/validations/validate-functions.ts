import {
  AbstractControl,
  AsyncValidatorFn,
  Validator,
  Validators,
  ValidatorFn,
  ValidationErrors,
} from "@angular/forms";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

export interface ValidationResult {
  [validator: string]: string | boolean;
}
export type AsyncValidatorArray = Array<Validator | AsyncValidatorFn>;
export type ValidatorArray = Array<Validator | ValidatorFn>;

const normalizeValidator = (
  validator: Validator | ValidatorFn
): ValidatorFn | AsyncValidatorFn => {
  const func = (validator as Validator).validate?.bind(validator);
  return typeof func === "function"
    ? (c: AbstractControl) => func(c)
    : (validator as ValidatorFn | AsyncValidatorFn);
};

export const composeValidators = (
  validators: ValidatorArray
): AsyncValidatorFn | ValidatorFn | null => {
  if (!validators || validators.length === 0) {
    return null;
  }
  return Validators.compose(validators.map(normalizeValidator));
};

export const validate =
  (validators: ValidatorArray, asyncValidators: AsyncValidatorArray) =>
  (control: AbstractControl): Observable<ValidationErrors | null> => {
    const syncValidator = composeValidators(validators);
    const asyncValidator = composeValidators(asyncValidators);

    const syncResult = syncValidator ? syncValidator(control) : null;

    if (asyncValidator) {
      return (
        asyncValidator(control) as Observable<ValidationErrors | null>
      ).pipe(map((asyncResult) => ({ ...syncResult, ...asyncResult })));
    }

    return of(syncResult);
  };

export const message = (validator: ValidationResult, key: string): string => {
  const validationValue = validator[key];

  switch (key) {
    case "required":
      return "Please enter a value";
    case "pattern":
      return "Value does not match required pattern";
    case "minlength":
    case "maxlength":
      if (
        typeof validationValue === "object" &&
        validationValue !== null &&
        "requiredLength" in validationValue
      ) {
        return `Value must be ${key === "minlength" ? "at least" : "at most"} ${
          (validationValue as { requiredLength: number }).requiredLength
        } characters`;
      }
      return `Validation failed: ${key}`;
    default:
      return typeof validationValue === "string"
        ? validationValue
        : `Validation failed: ${key}`;
  }
};
