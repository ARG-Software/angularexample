import { BaseMimsApi } from '../../classes/base/base.mims.api';
import { Injectable, Injector } from '@angular/core';
import { IContactMessageDto } from '../../../models/apimodels';
import { Observable } from 'rxjs/Observable';
import { IContactMessageService } from '@api/services/interfaces/core/icontactmessage.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ContactMessageService extends BaseMimsApi
  implements IContactMessageService {
  private controllerRoute = 'ContactMessage';

  constructor(private injector: Injector, private http: HttpClient) {
    super(injector, http);
  }

  public GetContactMessages(): Observable<IContactMessageDto[]> {
    return this.getObjects(`${this.controllerRoute}`);
    }
}
