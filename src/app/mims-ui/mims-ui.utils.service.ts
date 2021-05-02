import { Injectable, SimpleChange } from '@angular/core';

@Injectable()
export class MimsUiUtilsService {
  public verifyIfIncomeInputIsValid(input: SimpleChange): boolean {
    if (input) {
      if (input.currentValue !== null && input.currentValue !== undefined) {
        return true;
      }
    }
    return false;
  }
}
