import * as MimsModels from '../../../models/apimodels';
import { Observable } from 'rxjs/Observable';

export abstract class IAuthorizationService {
  public abstract login(credentials: MimsModels.ILoginDto): Observable<MimsModels.ILoginSession>;
}
