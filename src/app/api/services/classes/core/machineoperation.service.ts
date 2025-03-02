import { BaseMimsApi } from "../../classes/base/base.mims.api";
import { Injectable } from "@angular/core";
import { IMachineOperationsDto } from "../../../models/apimodels";
import { Observable } from "rxjs";
import { IMachineOperationService } from "../../interfaces/core/imachineoperation.service";
import { HttpClient } from "@angular/common/http";
import { GlobalEnvironmentService } from "src/app/global.environment.service";

@Injectable()
export class MachineOperationService
  extends BaseMimsApi
  implements IMachineOperationService
{
  private controllerRoute = "MachineOperation";

  constructor(
    protected http: HttpClient,
    protected serverSettings: GlobalEnvironmentService
  ) {
    super(http, serverSettings);
  }

  public AddMachineOperation(
    machineOperation: IMachineOperationsDto
  ): Observable<IMachineOperationsDto> {
    return this.insertObject(machineOperation, `${this.controllerRoute}`);
  }

  public DeleteMachineOperation(
    machineOperationId: number
  ): Observable<boolean> {
    return this.deleteById(machineOperationId, `${this.controllerRoute}`);
  }

  public GetMachineOperationsofProduct(
    productId: number
  ): Observable<IMachineOperationsDto[]> {
    return this.getObjects(`${this.controllerRoute}/productId/${productId}`);
  }
}
