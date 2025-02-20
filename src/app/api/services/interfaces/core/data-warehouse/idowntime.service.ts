import { Observable } from 'rxjs/Observable';
import { IMachineDowntimeScreenDto } from '../../../../models/apimodels';

export abstract class IDownTimeMachiningService {

    public abstract GetDownTimeData( obj: any ): Observable<IMachineDowntimeScreenDto>;
}
