import { BaseMimsApi } from "../../../classes/base/base.mims.api";
import { Injectable, Injector } from "@angular/core";
import { IProcessDetailMachiningService } from "../../../interfaces/core/data-warehouse/iprocess-detail.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ProcessDetailMachiningService
  extends BaseMimsApi
  implements IProcessDetailMachiningService
{
  private controllerRoute = "Process-Detail";
  constructor(private injector: Injector, private http: HttpClient) {
    super(injector, http);
  }

  public GetProcessDetailData(obj: any): Observable<any> {
    return this.getObjects(`${this.controllerRoute}/${obj}`);
  }
}
