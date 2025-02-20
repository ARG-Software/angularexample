import { Observable } from 'rxjs/Observable';
import { IOEEScreenDto } from '../../../../models/apimodels';

export abstract class IOeeMachiningService {

    public abstract GetOeeData( obj: any ): Observable<IOEEScreenDto>;
}
