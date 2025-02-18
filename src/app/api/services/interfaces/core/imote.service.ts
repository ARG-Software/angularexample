import { IMoteDto } from '@api/models/apimodels';
import { Observable } from 'rxjs';
export abstract class IMoteService {
  public abstract GetMotesofProduct(productId: number): Observable<IMoteDto[]>;
  public abstract AddMote(mote: IMoteDto): Observable<IMoteDto>;
  public abstract DeleteMote(moteId: number): Observable<boolean>;
}
