import { BaseMimsApi } from '../../classes/base/base.mims.api';
import { Injectable, Injector } from '@angular/core';
import { IDownTimeRecordService } from '../../interfaces/core/idowntimerecord.service';
import { IShiftGraphicDto } from '../../../models/apimodels';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DowntimeRecordService extends BaseMimsApi
  implements IDownTimeRecordService {
  private controllerRoute = 'Downtime';

  constructor(private injector: Injector, private http: HttpClient) {
    super(injector, http);
  }

  public getDowntimeOfProductShiftGraphic(productId: number, queryStartDate: Date
  ): Observable<IShiftGraphicDto[]> {
    const startDate = queryStartDate.toISOString();
    return this.getObjects(
      `${this.controllerRoute}/Product/Graphic/${productId}/${startDate}`
    );
  }
}
