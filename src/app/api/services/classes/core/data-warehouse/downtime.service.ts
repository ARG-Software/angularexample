import { BaseMimsApi } from "../../../classes/base/base.mims.api";
import { Injectable, Injector } from "@angular/core";
import { IDownTimeMachiningService } from "../../../interfaces/core/data-warehouse/idowntime.service";
import { IMachineDowntimeScreenDto } from "../../../../models/apimodels";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class DowntimeMachiningService
  extends BaseMimsApi
  implements IDownTimeMachiningService
{
  private controllerRoute = "DataWarehouse/graphics";

  constructor(private injector: Injector, private http: HttpClient) {
    super(injector, http);
  }

  public GetDownTimeData(obj: any): Observable<IMachineDowntimeScreenDto> {
    return this.getObjectUsingQueryingObjectPOST(
      obj,
      `${this.controllerRoute}/DowntimePareto`
    );
  }
}
