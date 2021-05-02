import { BaseMimsApi } from '../../../classes/base/base.mims.api';
import { Injectable, Injector } from '@angular/core';
import { IMessagingService } from '../../../interfaces/core/production/imessaging.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MessagingService extends BaseMimsApi
    implements IMessagingService {

    private controllerRoute = 'Messaging';

    constructor(private injector: Injector, private http: HttpClient) {
        super(injector, http);
    }

    public GetMessagingData( obj: any ): Observable<any> {
        return this.getObjects(`${this.controllerRoute}/${obj}`);
    }

    public UpdateMessagingData( obj: any ): Observable<any> {
        return this.updateObject( obj, `${this.controllerRoute}`);
    }
}
