import { BaseMimsApi } from '../../classes/base/base.mims.api';
import { Injectable, Injector } from '@angular/core';
import { IEdgeDto } from '../../../models/apimodels';
import { Observable } from 'rxjs';
import { IEdgeService } from '@api/services/interfaces/core/iedge.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EdgeService extends BaseMimsApi implements IEdgeService {
  private controllerRoute = 'Edge';

  constructor(private injector: Injector, private http: HttpClient) {
    super(injector, http);
  }

  public GetEdges(): Observable<IEdgeDto[]> {
    return this.getObjects(`${this.controllerRoute}`);
  }
}
