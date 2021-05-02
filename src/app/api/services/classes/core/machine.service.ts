import { BaseMimsApi } from '../../classes/base/base.mims.api';
import { Injectable, Injector } from '@angular/core';
import { IMachineService } from '../../interfaces/core/imachine.service';
import { IMachineDto } from '../../../models/apimodels';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MachineService extends BaseMimsApi implements IMachineService {

    private controllerRoute = 'Machine';

    constructor(private injector: Injector, private http: HttpClient) {
        super(injector, http);
    }

    public GetMachines(): Observable<IMachineDto[]> {
        return this.getObjects(`${this.controllerRoute}`);
    }
}
