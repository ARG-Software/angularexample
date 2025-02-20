import { IMachineOperationsDto } from '@api/models/apimodels';
import { Observable } from 'rxjs/Observable';
export abstract class IMachineOperationService {
  public abstract GetMachineOperationsofProduct(productId: number): Observable<IMachineOperationsDto[]>;
  public abstract AddMachineOperation(machineOperation: IMachineOperationsDto): Observable<IMachineOperationsDto>;
  public abstract DeleteMachineOperation(machineOperationId: number): Observable<boolean>;

}
