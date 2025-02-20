import { BaseMimsApi } from "../../../classes/base/base.mims.api";
import { Injectable, Injector } from "@angular/core";
import { IOeeMachiningService } from "../../../interfaces/core/data-warehouse/ioee.service";
import { IOEEScreenDto } from "../../../../models/apimodels";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class OeeMachiningService
  extends BaseMimsApi
  implements IOeeMachiningService
{
  private controllerRoute = "graphics/Oee";
  constructor(private injector: Injector, private http: HttpClient) {
    super(injector, http);
  }

  public GetOeeData(obj: any): Observable<IOEEScreenDto> {
    return this.getObjects(`${this.controllerRoute}/${obj}`);
  }
}
