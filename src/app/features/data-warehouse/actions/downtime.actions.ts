import { Action } from '@ngrx/store';
import { MachiningRequestModelUI, DowntimeDataModelUI } from '../models/downtime.models';
import { MimsSelectBoxModel } from '../../../mims-ui/input/select-box/models/select-box.model';

export enum DowntimeActionTypes {

    GetDowntimeDataSelectBoxes = '[Downtime] Get Downtime data for select boxes',
    GetDowntimeDataSelectBoxesSuccess = '[Downtime] Get Downtime data for select boxes Success',

    GetDowntimeData = '[Downtime] Get Downtime data',
    GetDowntimeDataSuccess = '[Downtime] Get Downtime data Success',

    DowntimeFailure = '[Downtime] Downtime Failed'
}

export class GetDowntimeData implements Action {
    public type = DowntimeActionTypes.GetDowntimeData;

    constructor(public payload: MachiningRequestModelUI) {}
}

export class GetDowntimeDataSelectBoxes implements Action {
    public type = DowntimeActionTypes.GetDowntimeDataSelectBoxes;

    constructor(public payload?: any) {}
}

export class GetDowntimeDataSelectBoxesSuccess implements Action {
    public type = DowntimeActionTypes.GetDowntimeDataSelectBoxesSuccess;

    constructor(public payload: MimsSelectBoxModel[]) {}
}

export class GetDowntimeDataSuccess implements Action {
    public type = DowntimeActionTypes.GetDowntimeDataSuccess;

    constructor(public payload: DowntimeDataModelUI) {}
}

export class DowntimeFailure implements Action {
    public type = DowntimeActionTypes.DowntimeFailure;

    constructor(public payload: any) {}
}

export type DowntimeActions =
    | GetDowntimeData
    | GetDowntimeDataSuccess
    | GetDowntimeDataSelectBoxes
    | GetDowntimeDataSelectBoxesSuccess
    | DowntimeFailure;
