import { BaseMimsApi } from '../../classes/base/base.mims.api';
import { Injectable, Injector } from '@angular/core';
import { IMoteDto } from '../../../models/apimodels';
import { Observable } from 'rxjs';
import { IMoteService } from '@api/services/interfaces/core/imote.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MoteService extends BaseMimsApi implements IMoteService {
  private controllerRoute = 'Mote';

  constructor(private injector: Injector, private http: HttpClient) {
    super(injector, http);
  }

  public AddMote(mote: IMoteDto): Observable<IMoteDto> {
    return this.insertObject(mote, `${this.controllerRoute}`);
  }
  public DeleteMote(moteId: number): Observable<boolean> {
    return this.deleteById(moteId, `${this.controllerRoute}`);
  }
  public GetMotesofProduct(moteId: number): Observable<IMoteDto[]> {
    return this.getObjects(`${this.controllerRoute}/productId/${moteId}`);
  }
}
