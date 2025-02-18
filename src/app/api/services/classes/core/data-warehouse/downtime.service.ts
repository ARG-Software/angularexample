import { BaseMimsApi } from '../../../classes/base/base.mims.api';
import { Injectable, Injector } from '@angular/core';
import { IDownTimeMachiningService } from '../../../interfaces/core/data-warehouse/idowntime.service';
import { Observable } from 'rxjs';
import { IMachineDowntimeScreenDto } from '../../../../models/apimodels';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DowntimeMachiningService
  extends BaseMimsApi
  implements IDownTimeMachiningService
{
  private controllerRoute = 'DataWarehouse/graphics';

  // ✅ Corrected parameter order and added `override` keyword for `http`
  constructor(override readonly http: HttpClient, injector: Injector) {
    super(http, injector); // ✅ Pass parameters in the correct order
  }

  public GetDownTimeData(obj: any): Observable<IMachineDowntimeScreenDto> {
    // ✅ Ensure correct method name is used
    return this.getObjectsUsingQueryingObjectPOST(
      obj,
      `${this.controllerRoute}/DowntimePareto`
    );
  }
}
