import { BaseMimsApi } from "../../classes/base/base.mims.api";
import { Injectable } from "@angular/core";
import { ISubcontractorsDto } from "../../../models/apimodels";
import { Observable } from "rxjs";
import { ISubcontractorService } from "@api/services/interfaces/core/isubcontractor.service";
import { HttpClient } from "@angular/common/http";
import { GlobalEnvironmentService } from "src/app/global.environment.service";

@Injectable()
export class SubcontractorService
  extends BaseMimsApi
  implements ISubcontractorService
{
  private controllerRoute = "Subcontractor";

  constructor(
    protected http: HttpClient,
    protected serverSettings: GlobalEnvironmentService
  ) {
    super(http, serverSettings);
  }

  public GetSubcontractors(): Observable<ISubcontractorsDto[]> {
    return this.getObjects(`${this.controllerRoute}`);
  }
}
