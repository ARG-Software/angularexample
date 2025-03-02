import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseMimsApi } from "../../classes/base/base.mims.api";
import { IAuthorizationService } from "../..//interfaces/core/iauthorization.service";
import * as MimsModels from "../../../models/apimodels";
import { HttpClient } from "@angular/common/http";
import { GlobalEnvironmentService } from "src/app/global.environment.service";

@Injectable()
export class AuthorizationService
  extends BaseMimsApi
  implements IAuthorizationService
{
  private controllerRoute = "auth";

  constructor(
    protected http: HttpClient,
    protected serverSettings: GlobalEnvironmentService
  ) {
    super(http, serverSettings);
  }

  /** Method to do the login.
   * @param credentials - The credentials for the user to login.
   */
  public login(
    credentials: MimsModels.ILoginDto
  ): Observable<MimsModels.ILoginSession> {
    return this.getObjectUsingQueryingObjectPOSTandFormTypeRequest(
      credentials,
      `${this.controllerRoute}/login`
    );
  }
}
