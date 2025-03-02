import { BaseMimsApi } from "../../classes/base/base.mims.api";
import { Injectable } from "@angular/core";
import { IContactMessageDto } from "../../../models/apimodels";
import { Observable } from "rxjs";
import { IContactMessageService } from "@api/services/interfaces/core/icontactmessage.service";
import { HttpClient } from "@angular/common/http";
import { GlobalEnvironmentService } from "src/app/global.environment.service";

@Injectable()
export class ContactMessageService
  extends BaseMimsApi
  implements IContactMessageService
{
  private controllerRoute = "ContactMessage";

  constructor(
    protected http: HttpClient,
    protected serverSettings: GlobalEnvironmentService
  ) {
    super(http, serverSettings);
  }

  public GetContactMessages(): Observable<IContactMessageDto[]> {
    return this.getObjects(`${this.controllerRoute}`);
  }
}
