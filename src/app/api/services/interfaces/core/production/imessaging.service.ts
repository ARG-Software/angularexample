import { Observable } from "rxjs";

export abstract class IMessagingService {
  public abstract GetMessagingData(obj: any): Observable<any>;

  public abstract UpdateMessagingData(obj: any): Observable<any>;
}
