import { Observable } from "rxjs";
import { BaseMimsApi } from "../../classes/base/base.mims.api";
import { ISettingsService } from "../../interfaces/core/isettings.service";
import { Injectable } from "@angular/core";
import { IBufferDto } from "../../../models/apimodels";
import {
  WipDataModelUI,
  KanbanDataModelUI,
} from "../../../../features/products/models/settings.models";
import { HttpClient } from "@angular/common/http";
import { GlobalEnvironmentService } from "src/app/global.environment.service";

@Injectable()
export class SettingsService extends BaseMimsApi implements ISettingsService {
  private controllerRoute = "Buffer";

  constructor(
    protected http: HttpClient,
    protected serverSettings: GlobalEnvironmentService
  ) {
    super(http, serverSettings);
  }

  public GetBuffersForProduct(productId: number): Observable<IBufferDto[]> {
    return this.getObjects(`${this.controllerRoute}/product/${productId}`);
  }

  public UpdateWip(wipData: WipDataModelUI[]): Observable<boolean> {
    return this.updateObject(
      wipData,
      `${this.controllerRoute}/updateBufferCount`
    );
  }

  public UpdateKanBan(kanbanData: KanbanDataModelUI[]): Observable<boolean> {
    return this.updateObject(
      kanbanData,
      `${this.controllerRoute}/updateBufferKanBan`
    );
  }

  public UpdateDowntimeForProduct(
    productId: number,
    downtimeInMinutes: number
  ): Observable<boolean> {
    return this.updateObject(
      { productId, downtimeInMinutes },
      `${this.controllerRoute}`
    );
  }
}
