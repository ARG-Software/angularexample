import { Observable } from 'rxjs/Observable';
import { IMachineDto } from '../../../models/apimodels';

export abstract class IMachineService {
    public abstract GetMachines(): Observable<IMachineDto[]>;
}
