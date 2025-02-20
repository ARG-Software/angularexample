import { Action } from '@ngrx/store';
import { ProductModelUI, OperationModelUI,
    MoteModelUI, SensorModelUI,
    ConfigureSelectBoxModelUI,
    MachineOperationModelUI } from '../models/configure.model';

export enum ConfigurationActionTypes {
    GetProductDetails = '[Configure] Get Product Details',
    GetProductDetailsSuccess = '[Configure] Get Product Details Success',
    SaveProductDetails = '[Configure] Save Product Details',
    SaveProductDetailsSuccess = '[Configure] Save Product Details Success',

    GetOperations = '[Configure] Get Operations',
    GetOperationsSuccess = '[Configure] Get Operations Success',
    GetOperationsSelectBoxSuccess = '[Configure] Get Operations SelectBox Success',
    AddOperation = '[Configure] Add Operation',
    AddOperationSuccess = '[Configure] Add Operation Success',
    RemoveOperation = '[Configure] Remove Operation',
    RemoveOperationSuccess = '[Configure] Remove Operation Success',

    GetMachineOperations = '[Configure] Get Machine Operations',
    GetMachineOperationsSuccess = '[Configure] Get Machine Operations Success',
    AddMachineOperation = '[Configure] Add Machine Operation',
    AddMachineOperationSuccess = '[Configure] Add Machine Operation Success',
    RemoveMachineOperation = '[Configure] Remove Machine Operation',
    RemoveMachineOperationSuccess = '[Configure] Remove Machine Operation Success',

    GetMotes = '[Configure] Get Motes',
    GetMotesSuccess = '[Configure] Get Motes Success',
    GetMotesSelectBoxSuccess = '[Configure] Get Motes SelectBox Success',
    AddMote = '[Configure] Add Mote',
    AddMoteSuccess = '[Configure] Add Mote Success',
    RemoveMote = '[Configure] Remove Mote',
    RemoveMoteSuccess = '[Configure] Remove Mote Success',

    GetSensors = '[Configure] Get Sensors',
    GetSensorsSuccess = '[Configure] Get Sensors Success',
    AddSensor = '[Configure] Add Sensor',
    AddSensorSuccess = '[Configure] Add Sensor Success',
    RemoveSensor = '[Configure] Remove Sensor',
    RemoveSensorSuccess = '[Configure] Remove Sensor Success',

    GetEdgesSelectBox = '[Configure] Get Edges Select Box',
    GetEdgesSelectBoxSuccess = '[Configure] Get Edges Success Select Box',
    GetSubcontractorsSelectBox = '[Configure] Get Subcontractors Select Box',
    GetSubcontractorsSelectBoxSuccess = '[Configure] Get Subcontractors Select Box Success',
    GetMessagesSelectBox = '[Configure] Get Messages Select Box',
    GetMessagesSelectBoxSuccess = '[Configure] Get Messages Select Box Success',
    GetMachineSelectBox = '[Configure] Get Machine Select Box',
    GetMachineSelectBoxSuccess = '[Configure] Get Machine Select Box Success',

    GetResumePage = '[Configure] Get Resume Page Data',

    NoNeedToUpdate =  '[Configure] No update needed',

    FinishWizard = '[Configure] Finish Wizard',

    ErrorConfiguration = '[Configure] Configuration Error'
}

export class GetProductDetails implements Action {
  public type = ConfigurationActionTypes.GetProductDetails;

  constructor(public payload: number) {}
}

export class GetProductDetailsSuccess implements Action {
    public type = ConfigurationActionTypes.GetProductDetailsSuccess;

    constructor(public payload: ProductModelUI) {}
}

export class SaveProductDetails implements Action {
    public type = ConfigurationActionTypes.SaveProductDetails;

    constructor(public payload: ProductModelUI) {}
}

export class SaveProductDetailsSuccess implements Action {
    public type = ConfigurationActionTypes.SaveProductDetailsSuccess;

    constructor(public payload: ProductModelUI) {}
}

export class GetOperations implements Action {
    public type = ConfigurationActionTypes.GetOperations;

    constructor(public payload: number) {}
}

export class GetOperationsSuccess implements Action {
    public type = ConfigurationActionTypes.GetOperationsSuccess;

    constructor(public payload: OperationModelUI[]) {}
}

export class GetOperationsSelectBoxSuccess implements Action {
    public type = ConfigurationActionTypes.GetOperationsSelectBoxSuccess;

    constructor(public payload: ConfigureSelectBoxModelUI[]) {}
}

export class AddOperation implements Action {
    public type = ConfigurationActionTypes.AddOperation;

    constructor(public payload: OperationModelUI) {}
}

export class AddOpertionSuccess implements Action {
    public type = ConfigurationActionTypes.AddOperationSuccess;

    constructor(public payload: OperationModelUI) {}
}

export class RemoveOperation implements Action {
    public type = ConfigurationActionTypes.RemoveOperation;

    constructor(public payload: number) {}
}

export class RemoveOperationSuccess implements Action {
    public type = ConfigurationActionTypes.RemoveOperationSuccess;

    constructor(public payload: number) {}
}

export class GetMachineOperations implements Action {
    public type = ConfigurationActionTypes.GetMachineOperations;

    constructor(public payload: number) {}
}

export class GetMachineOperationSuccess implements Action {
    public type = ConfigurationActionTypes.GetMachineOperationsSuccess;

    constructor(public payload: MachineOperationModelUI[]) {}
}

export class AddMachineOperation implements Action {
    public type = ConfigurationActionTypes.AddMachineOperation;

    constructor(public payload: MachineOperationModelUI) {}
}

export class AddMachineOperationSuccess implements Action {
    public type = ConfigurationActionTypes.AddMachineOperationSuccess;

    constructor(public payload: MachineOperationModelUI) {}
}

export class RemoveMachineOperation implements Action {
    public type = ConfigurationActionTypes.RemoveMachineOperation;

    constructor(public payload: number) {}
}

export class RemoveMachineOperationSuccess implements Action {
    public type = ConfigurationActionTypes.RemoveMachineOperationSuccess;

    constructor(public payload: number) {}
}

export class GetMotes implements Action {
    public type = ConfigurationActionTypes.GetMotes;
    constructor(public payload: number) {}
}

export class GetMotesSuccess implements Action {
    public type = ConfigurationActionTypes.GetMotesSuccess;
    constructor(public payload: MoteModelUI[]) {}
}

export class AddMote implements Action {
    public type = ConfigurationActionTypes.AddMote;
    constructor(public payload: MoteModelUI) {}
}

export class AddMoteSuccess implements Action {
    public type = ConfigurationActionTypes.AddMoteSuccess;
    constructor(public payload: MoteModelUI) {}
}

export class RemoveMote implements Action {
    public type = ConfigurationActionTypes.RemoveMote;
    constructor(public payload: number) {}
}

export class RemoveMoteSuccess implements Action {
    public type = ConfigurationActionTypes.RemoveMoteSuccess;
    constructor(public payload: number) {}
}

export class GetMotesSelectBoxSuccess implements Action {
    public type = ConfigurationActionTypes.GetMotesSelectBoxSuccess;

    constructor(public payload: ConfigureSelectBoxModelUI[]) {}
}

export class GetSensors implements Action {
    public type = ConfigurationActionTypes.GetSensors;
    constructor(public payload: number) {}
}

export class GetSensorsSuccess implements Action {
    public type = ConfigurationActionTypes.GetSensorsSuccess;
    constructor(public payload: SensorModelUI[]) {}
}

export class AddSensor implements Action {
    public type = ConfigurationActionTypes.AddSensor;
    constructor(public payload: SensorModelUI) {}
}

export class AddSensorSuccess implements Action {
    public type = ConfigurationActionTypes.AddSensorSuccess;
    constructor(public payload: SensorModelUI) {}
}

export class RemoveSensor implements Action {
    public type = ConfigurationActionTypes.RemoveSensor;
    constructor(public payload: number) {}
}

export class RemoveSensorSuccess implements Action {
    public type = ConfigurationActionTypes.RemoveSensorSuccess;
    constructor(public payload: any) {}
}

export class GetEdgesSelectBox implements Action {
    public type = ConfigurationActionTypes.GetEdgesSelectBox;

    constructor(public payload: any) {}
}

export class GetEdgesSelectBoxSuccess implements Action {
    public type = ConfigurationActionTypes.GetEdgesSelectBoxSuccess;

    constructor(public payload: ConfigureSelectBoxModelUI[]) {}
}

export class GetSubcontractorsSelectBox implements Action {
    public type = ConfigurationActionTypes.GetSubcontractorsSelectBox;

    constructor(public payload: any) {}
}

export class GetSubcontractorsSelectBoxSuccess implements Action {
    public type = ConfigurationActionTypes.GetSubcontractorsSelectBoxSuccess;

    constructor(public payload: ConfigureSelectBoxModelUI[]) {}
}

export class GetMessagesSelectBox implements Action {
    public type = ConfigurationActionTypes.GetMessagesSelectBox;

    constructor(public payload: any) {}
}

export class GetMessagesSelectBoxSuccess implements Action {
    public type = ConfigurationActionTypes.GetMessagesSelectBoxSuccess;

    constructor(public payload: ConfigureSelectBoxModelUI[]) {}
}

export class GetMachineSelectBox implements Action {
    public type = ConfigurationActionTypes.GetMachineSelectBox;

    constructor(public payload: any) {}
}

export class GetMachineSelectBoxSuccess implements Action {
    public type = ConfigurationActionTypes.GetMachineSelectBoxSuccess;

    constructor(public payload: ConfigureSelectBoxModelUI[]) {}
}

export class GetResumePage implements Action {
    public type = ConfigurationActionTypes.GetResumePage;

    constructor(public payload: any) {}
}

export class NoNeedToUpdate implements Action {
    public type = ConfigurationActionTypes.NoNeedToUpdate;

    constructor(public payload: any) {}
}

export class FinishWizard implements Action {
    public type = ConfigurationActionTypes.FinishWizard;

    constructor(public payload: any) {}
}

export class ErrorConfiguration implements Action {
    public type = ConfigurationActionTypes.ErrorConfiguration;

    constructor(public payload: any) {}
}

export type ConfigureActions =
  | GetProductDetails
  | GetProductDetailsSuccess
  | SaveProductDetails
  | SaveProductDetailsSuccess
  | GetOperations
  | GetOperationsSuccess
  | GetOperationsSelectBoxSuccess
  | AddOperation
  | AddOpertionSuccess
  | RemoveOperation
  | RemoveOperationSuccess
  | GetMachineOperations
  | GetMachineOperationSuccess
  | AddMachineOperation
  | AddMachineOperationSuccess
  | RemoveMachineOperation
  | RemoveMachineOperationSuccess
  | GetMotes
  | GetMotesSuccess
  | AddMote
  | AddMoteSuccess
  | RemoveMote
  | RemoveMoteSuccess
  | GetMotesSelectBoxSuccess
  | GetSensors
  | GetSensorsSuccess
  | AddSensor
  | AddSensorSuccess
  | RemoveSensor
  | RemoveSensorSuccess
  | GetEdgesSelectBoxSuccess
  | GetEdgesSelectBoxSuccess
  | GetSubcontractorsSelectBox
  | GetSubcontractorsSelectBoxSuccess
  | GetMessagesSelectBox
  | GetMessagesSelectBoxSuccess
  | GetMachineSelectBox
  | GetMachineSelectBoxSuccess
  | NoNeedToUpdate
  | FinishWizard
  | ErrorConfiguration;
