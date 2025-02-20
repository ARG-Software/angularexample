import { ClarityModule } from '@clr/angular';
import { MimsUIModule } from '@mimsUI/mims-ui.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducerName, reducers } from './production.reducers.index';

import { MachineStateInformationComponent } from './components/machine-state/machine-state-information.component';
import { MachineStateComponent } from './containers/machine-state/machine-state.component';
import { MachineStateEffects } from './effects/machine-state.effects';

import { MessagingInformationComponent } from './components/messaging/messaging-information.component';
import { MessagingComponent } from './containers/messaging/messaging.component';
import { MessagingEffects } from './effects/messaging.effects';

const ProductionRoutingModule = RouterModule.forChild([
    { path: 'machine-state', component: MachineStateComponent },
    { path: 'messaging', component: MessagingComponent }
]);

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MimsUIModule,
        ProductionRoutingModule,
        ClarityModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature(reducerName, reducers),
        EffectsModule.forFeature([
            MachineStateEffects,
            MessagingEffects
        ])
    ],
    declarations: [
        MachineStateInformationComponent,
        MachineStateComponent,
        MessagingInformationComponent,
        MessagingComponent
    ]
})
export class ProductionModule {}
