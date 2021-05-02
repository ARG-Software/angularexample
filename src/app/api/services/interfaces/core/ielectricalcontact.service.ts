import { IElectricalContactDto } from '@api/models/apimodels';
import { Observable } from 'rxjs/Observable';
export abstract class IElectricalConcactService {
  public abstract GetECofProduct(productId: number): Observable<IElectricalContactDto[]>;
  public abstract AddEC(ec: IElectricalContactDto): Observable<IElectricalContactDto>;
  public abstract DeleteEC(ecId: number): Observable<boolean>;
}
