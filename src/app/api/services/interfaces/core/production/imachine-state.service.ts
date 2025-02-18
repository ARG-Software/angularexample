import { Observable } from 'rxjs';

export abstract class IMachineStateService {
  public abstract GetMachineStateData(obj: any): Observable<any>;

  public abstract UpdateMachineStateData(obj: any): Observable<any>;
}
