import { Injectable } from "@angular/core";
import {
  FormGroup,
  ValidationErrors,
  AbstractControl,
  FormArray,
} from "@angular/forms";

@Injectable()
export class MimsFormErrorsService {
  public getFormGroupValidationErrors(formEl: FormGroup) {
    let errs: { [key: string]: ValidationErrors } = {};

    Object.keys(formEl.controls).forEach((key) => {
      const controlErrors: ValidationErrors | null =
        formEl.get(key)?.errors || null;
      if (controlErrors) {
        errs[key] = controlErrors;
      }
    });

    return errs;
  }

  public displayFormErrors(controlNameAlias: any, errors: any): any[] {
    const errorList = [] as any;
    const controlNameWithErrorsList = Object.keys(errors);
    controlNameWithErrorsList.forEach((controlName) => {
      const errorTypeArray = Object.keys(errors[controlName]);
      const errorDetail = errors[controlName];
      const alias = controlNameAlias[controlName];
      errorTypeArray.forEach((error) => {
        this.prettyErrorListFormat(error, alias, errorList, errorDetail);
      });
    });
    return errorList;
  }

  private prettyErrorListFormat(
    errorType: string,
    alias: any,
    errorList: any[],
    errorDetail: any
  ) {
    switch (errorType) {
      case "required": {
        const errorFormated = "The field " + alias + " is required";
        errorList.push(errorFormated);
        break;
      }
      case "maxlength":
      case "minlength": {
        const errorIsForMaxLength = errorType === "maxlength";
        const requiredLength = errorIsForMaxLength
          ? errorDetail.maxlength.requiredLength
          : errorDetail.minlength.requiredLength;
        const actualLength = errorIsForMaxLength
          ? errorDetail.maxlength.actualLength
          : errorDetail.minlength.actualLength;
        const errorFormated =
          "The field " + alias + " has a actual length of " + actualLength;
        const errorFormatedDetail =
          (errorIsForMaxLength ? ".The maximum is " : ".The minimum is ") +
          requiredLength +
          ". Please update.";
        errorList.push(errorFormated + errorFormatedDetail);
        break;
      }
      case "max":
      case "min": {
        const errorIsForMaxValue = errorType === "max";
        const requiredValue = errorIsForMaxValue
          ? errorDetail.max.max
          : errorDetail.min.min;
        const actualValue = errorIsForMaxValue
          ? errorDetail.max.actual
          : errorDetail.min.actual;
        const errorFormated =
          "The field " + alias + " has a actual value of " + actualValue;
        const errorFormatedDetail =
          (errorIsForMaxValue ? ".The maximum is " : ".The minimum is ") +
          requiredValue +
          ". Please update.";
        errorList.push(errorFormated + errorFormatedDetail);
        break;
      }
      case "isNumber": {
        const errorFormated = "The field " + alias + " should be only numeric";
        errorList.push(errorFormated);
        break;
      }
      default:
        errorList.push("Undefined error for" + errorType);
    }
  }
}
