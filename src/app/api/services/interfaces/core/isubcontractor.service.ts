import { Observable } from 'rxjs/Observable';
import { ISubcontractorsDto } from '../../../models/apimodels';

export abstract class ISubcontractorService {
    public abstract GetSubcontractors(): Observable<ISubcontractorsDto[]>;
}
