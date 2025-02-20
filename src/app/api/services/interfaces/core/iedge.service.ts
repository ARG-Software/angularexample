import { Observable } from 'rxjs/Observable';
import { IEdgeDto } from '../../../models/apimodels';

export abstract class IEdgeService {
    public abstract GetEdges(): Observable<IEdgeDto[]>;
}
