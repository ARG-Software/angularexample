import { BaseMimsApi } from '../../classes/base/base.mims.api';
import { Injectable, Injector } from '@angular/core';
import { ISubcontractorsDto } from '../../../models/apimodels';
import { Observable } from 'rxjs/Observable';
import { ISubcontractorService } from '@api/services/interfaces/core/isubcontractor.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SubcontractorService extends BaseMimsApi implements ISubcontractorService {
    private controllerRoute = 'Subcontractor';

    constructor(private injector: Injector, private http: HttpClient) {
        super(injector, http);
    }

    public GetSubcontractors(): Observable<ISubcontractorsDto[]> {
        return this.getObjects(`${this.controllerRoute}`);
    }
}
