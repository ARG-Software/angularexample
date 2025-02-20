import { Action } from '@ngrx/store';
import {
    MachineStateDataRequestModelUI,
    MachineStateLoadDataModelUI,
    MachineStateSaveDataModelUI
} from '../models/machine-state.model';

export enum MachineStateActionTypes {

    GetMachineData = '[Machine] Get machine state data',
    GetMachineDataSuccess = '[Machine] Get machine state data success',

    UpdateMachineData = '[Machine] Update machine state data',
    UpdateMachineDataSuccess = '[Machine] Update machine state data success',

    MachineFailure = '[Machine] Machine Failed'
}

export class GetMachineData implements Action {
    public type = MachineStateActionTypes.GetMachineData;

    constructor(public payload: MachineStateDataRequestModelUI) {}
}

export class GetMachineDataSuccess implements Action {
    public type = MachineStateActionTypes.GetMachineDataSuccess;

    constructor(public payload: MachineStateLoadDataModelUI[]) {}
}

export class UpdateMachineData implements Action {
    public type = MachineStateActionTypes.UpdateMachineData;

    constructor(public payload: MachineStateSaveDataModelUI) {}
}

export class UpdateMachineDataSuccess implements Action {
    public type = MachineStateActionTypes.UpdateMachineDataSuccess;

    constructor(public payload: boolean) {}
}

export class MachineFailure implements Action {
    public type = MachineStateActionTypes.MachineFailure;

    constructor(public payload: any) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type MachineActions =
    | GetMachineData
    | GetMachineDataSuccess
    | UpdateMachineData
    | UpdateMachineDataSuccess
    | MachineFailure;
