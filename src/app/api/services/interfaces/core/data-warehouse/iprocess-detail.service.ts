import { Observable } from 'rxjs/Observable';

export abstract class IProcessDetailMachiningService {

    public abstract GetProcessDetailData( obj: any ): Observable<any>;
}
