import { Action } from '@ngrx/store';
import { KanbanDataModelUI, WipDataModelUI } from '../models/settings.models';

export enum SettingsActionTypes {

    LoadData = '[Settings] Load Data (WIP, KanBan, Alarm Settings)',
    LoadDataSuccess = '[Settings] Load Data (WIP, KanBan, Alarm Settings) Success',

    UpdateWip = '[Settings] Update WIP',
    UpdateWipSuccess = '[Settings] Update WIP Success',

    UpdateKanBan = '[Settings] Update Kan-Ban Limits',
    UpdateKanBanSuccess = '[Settings] Update Kan-Ban Limits Success',

    SettingsFailure = '[Settings] Settings Failed'
}

export class LoadData implements Action {
    public type = SettingsActionTypes.LoadData;

    constructor(public payload: number) {}
}

export class LoadDataSuccess implements Action {
    public type = SettingsActionTypes.LoadDataSuccess;

    constructor(public payload?: any) {}
}

export class UpdateWip implements Action {
    public type = SettingsActionTypes.UpdateWip;

    constructor(public payload: WipDataModelUI[]) {}
}

export class UpdateWipSuccess implements Action {
    public type = SettingsActionTypes.UpdateWipSuccess;

    constructor(public payload: boolean) {}
}

export class UpdateKanBan implements Action {
    public type = SettingsActionTypes.UpdateKanBan;

    constructor(public payload: KanbanDataModelUI[]) {}
}

export class UpdateKanBanSuccess implements Action {
    public type = SettingsActionTypes.UpdateKanBanSuccess;

    constructor(public payload: boolean) {}
}

export class SettingsFailure implements Action {
    public type = SettingsActionTypes.SettingsFailure;

    constructor(public payload: any) {}
}

export type SettingsActions =
    | LoadData
    | LoadDataSuccess
    | UpdateWip
    | UpdateWipSuccess
    | UpdateKanBan
    | UpdateKanBanSuccess
    | SettingsFailure;
