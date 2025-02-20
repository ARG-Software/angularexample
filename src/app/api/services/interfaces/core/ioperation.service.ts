import { Observable } from "rxjs";
import { IOperationDto } from "../../../models/apimodels";

export abstract class IOperationService {
  public abstract GetOperationsByProductId(
    productId: number
  ): Observable<IOperationDto[]>;
  public abstract AddOperation(
    operation: IOperationDto
  ): Observable<IOperationDto>;
  public abstract DeleteOperation(operationId: number): Observable<boolean>;
}
