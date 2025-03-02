import { BaseMimsApi } from "../../classes/base/base.mims.api";
import { Injectable } from "@angular/core";
import { IDownTimeRecordService } from "../../interfaces/core/idowntimerecord.service";
import { IShiftGraphicDto } from "../../../models/apimodels";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { GlobalEnvironmentService } from "src/app/global.environment.service";

@Injectable()
export class DowntimeRecordService
  extends BaseMimsApi
  implements IDownTimeRecordService
{
  private controllerRoute = "Downtime";

  constructor(
    protected http: HttpClient,
    protected serverSettings: GlobalEnvironmentService
  ) {
    super(http, serverSettings);
  }

  public getDowntimeOfProductShiftGraphic(
    productId: number,
    queryStartDate: Date
  ): Observable<IShiftGraphicDto[]> {
    const startDate = queryStartDate.toISOString();
    return this.getObjects(
      `${this.controllerRoute}/Product/Graphic/${productId}/${startDate}`
    );
  }
}
