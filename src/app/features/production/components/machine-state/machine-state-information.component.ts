import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MachineStateSaveDataModelUI, MachineStateLoadDataModelUI } from '../../models/machine-state.model';
import { MimsSelectBoxModel } from '@mimsUI/input/select-box/models/select-box.model';

@Component({
    selector: 'machine-state-information',
    templateUrl: './machine-state-information.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MachineStateInformationComponent {

    @Input() public machineData: MachineStateLoadDataModelUI[];

    @Output() public changedMachineEmitter: EventEmitter<MachineStateSaveDataModelUI> = new EventEmitter();

    /**
     * Emit machineId with the new selected option
     */
    private selectBoxChange(option: MimsSelectBoxModel, machineId: number) {
        this.changedMachineEmitter.emit({
            Id: machineId,
            Option: option
        });
    }
}
