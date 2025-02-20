import { BaseMimsApi } from "../../classes/base/base.mims.api";
import { Injectable, Injector } from "@angular/core";
import { IElectricalContactDto } from "../../../models/apimodels";
import { Observable } from "rxjs";
import { IElectricalConcactService } from "@api/services/interfaces/core/ielectricalcontact.service";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ElectricalContactService
  extends BaseMimsApi
  implements IElectricalConcactService
{
  private controllerRoute = "ElectricalContact";

  constructor(private injector: Injector, private http: HttpClient) {
    super(injector, http);
  }

  public AddEC(ec: IElectricalContactDto): Observable<IElectricalContactDto> {
    return this.insertObject(ec, `${this.controllerRoute}`);
  }
  public DeleteEC(ecId: number): Observable<boolean> {
    return this.deleteById(ecId, `${this.controllerRoute}`);
  }
  public GetECofProduct(ecId: number): Observable<IElectricalContactDto[]> {
    return this.getObjects(`${this.controllerRoute}/productId/${ecId}`);
  }
}
