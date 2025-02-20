import { Observable } from "rxjs";

export abstract class IProcessDetailMachiningService {
  public abstract GetProcessDetailData(obj: any): Observable<any>;
}
