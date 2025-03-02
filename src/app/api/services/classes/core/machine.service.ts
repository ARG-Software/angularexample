import { BaseMimsApi } from "../../classes/base/base.mims.api";
import { Injectable } from "@angular/core";
import { IMachineService } from "../../interfaces/core/imachine.service";
import { IMachineDto } from "../../../models/apimodels";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { GlobalEnvironmentService } from "src/app/global.environment.service";

@Injectable()
export class MachineService extends BaseMimsApi implements IMachineService {
  private controllerRoute = "Machine";

  constructor(
    protected http: HttpClient,
    protected serverSettings: GlobalEnvironmentService
  ) {
    super(http, serverSettings);
  }

  public GetMachines(): Observable<IMachineDto[]> {
    return this.getObjects(`${this.controllerRoute}`);
  }
}
