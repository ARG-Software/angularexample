import { BaseMimsApi } from "../../../classes/base/base.mims.api";
import { Injectable, Injector } from "@angular/core";
import { IMachineStateService } from "../../../interfaces/core/production/imachine-state.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class MachineStateService
  extends BaseMimsApi
  implements IMachineStateService
{
  private controllerRoute = "Machine-State";

  constructor(private injector: Injector, private http: HttpClient) {
    super(injector, http);
  }

  public GetMachineStateData(obj: any): Observable<any> {
    return this.getObjects(`${this.controllerRoute}/${obj}`);
  }

  public UpdateMachineStateData(obj: any): Observable<any> {
    return this.updateObject(obj, `${this.controllerRoute}`);
  }
}
