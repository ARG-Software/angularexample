import { DowntimeRecordService } from './services/classes/core/downtimerecord.service';
import { IDownTimeRecordService } from '@api/services/interfaces/core/idowntimerecord.service';
import { MachineOperationService } from './services/classes/core/machineoperation.service';
import { IMachineOperationService } from '@api/services/interfaces/core/imachineoperation.service';
import { IAuthorizationService } from '@api/services/interfaces/core/iauthorization.service';

import { IDownTimeMachiningService } from '@api/services/interfaces/core/data-warehouse/idowntime.service';
import { IOeeMachiningService } from '@api/services/interfaces/core/data-warehouse/ioee.service';
import { IProcessDetailMachiningService } from '@api/services/interfaces/core/data-warehouse/iprocess-detail.service';

import { DowntimeMachiningService } from './services/classes/core/data-warehouse/downtime.service';
import { OeeMachiningService } from './services/classes/core/data-warehouse/oee.service';
import { ProcessDetailMachiningService } from './services/classes/core/data-warehouse/process-detail.service';

import { SettingsService } from '@api/services/classes/core/settings.service';
import { ISettingsService } from '@api/services/interfaces/core/isettings.service';

import { ProductService } from '@api/services/classes/core/product.service';
import { IProductService } from '@api/services/interfaces/core/iproduct.service';

import { MachineService } from '@api/services/classes/core/machine.service';
import { IMachineService } from '@api/services/interfaces/core/imachine.service';

import { MachineStateService } from '@api/services/classes/core/production/machine-state.service';
import { IMachineStateService } from '@api/services/interfaces/core/production/imachine-state.service';

import { MessagingService } from '@api/services/classes/core/production/messaging.service';
import { IMessagingService } from '@api/services/interfaces/core/production/imessaging.service';

import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationService } from '@api/services/classes/core/autorization.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IOperationService } from '@api/services/interfaces/core/ioperation.service';
import { OperationService } from '@api/services/classes/core/operation.service';
import { ISubcontractorService } from '@api/services/interfaces/core/isubcontractor.service';
import { SubcontractorService } from '@api/services/classes/core/subcontractor.service';
import { IEdgeService } from '@api/services/interfaces/core/iedge.service';
import { EdgeService } from '@api/services/classes/core/edge.service';
import { IElectricalConcactService } from '@api/services/interfaces/core/ielectricalcontact.service';
import { ElectricalContactService } from '@api/services/classes/core/electricalcontact.service';
import { IMoteService } from '@api/services/interfaces/core/imote.service';
import { MoteService } from '@api/services/classes/core/mote.service';
import { IContactMessageService } from './services/interfaces/core/icontactmessage.service';
import { ContactMessageService } from './services/classes/core/contactmessage.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ApiAuthService } from './services/api-auth.service';

@NgModule({
  imports: [CommonModule, HttpClientModule]
})
export class ApiModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [
        ApiAuthService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
        { provide: IAuthorizationService, useClass: AuthorizationService },
        { provide: IMachineOperationService, useClass: MachineOperationService },
        { provide: IDownTimeRecordService, useClass: DowntimeRecordService },
        { provide: IDownTimeMachiningService, useClass: DowntimeMachiningService },
        { provide: IOeeMachiningService, useClass: OeeMachiningService },
        { provide: IProcessDetailMachiningService, useClass: ProcessDetailMachiningService },
        { provide: ISettingsService, useClass: SettingsService },
        { provide: IMachineService, useClass: MachineService },
        { provide: IProductService, useClass: ProductService },
        { provide: IMachineStateService, useClass: MachineStateService },
        { provide: IMessagingService, useClass: MessagingService },
        { provide: IOperationService, useClass: OperationService },
        { provide: ISubcontractorService, useClass: SubcontractorService },
        { provide: IEdgeService, useClass: EdgeService },
        { provide: IElectricalConcactService, useClass: ElectricalContactService },
        { provide: IMoteService, useClass: MoteService },
        { provide: IContactMessageService, useClass: ContactMessageService}
      ]
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: ApiModule
  ) {
    if (parentModule) {
      throw new Error(
        'ApiModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
