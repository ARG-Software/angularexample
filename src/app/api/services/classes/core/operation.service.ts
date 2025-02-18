import { BaseMimsApi } from '../../classes/base/base.mims.api';
import { Injectable, Injector } from '@angular/core';
import { IOperationDto } from '../../../models/apimodels';
import { Observable } from 'rxjs';
import { IOperationService } from '@api/services/interfaces/core/ioperation.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OperationService extends BaseMimsApi implements IOperationService {
  private controllerRoute = 'Operations';
  constructor(private injector: Injector, private http: HttpClient) {
    super(injector, http);
  }

  public AddOperation(operation: IOperationDto): Observable<IOperationDto> {
    return this.insertObject(operation, `${this.controllerRoute}/addOperation`);
  }
  public DeleteOperation(operationId: number): Observable<boolean> {
    return this.deleteById(operationId, `${this.controllerRoute}`);
  }
  public GetOperationsByProductId(
    productId: number
  ): Observable<IOperationDto[]> {
    return this.getObjects(`${this.controllerRoute}/productId/${productId}`);
  }
}
