import * as fromMachineReducerDefinition from './reducers/machine-state.reducer';
import * as fromMessagingReducerDefinition from './reducers/messasing.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const reducerName = 'production';

export interface ProductionState {
    machine: fromMachineReducerDefinition.MachineState;
    messaging: fromMessagingReducerDefinition.MessagingState;
}

export const reducers = {
    machine: fromMachineReducerDefinition.reducer,
    messaging: fromMessagingReducerDefinition.reducer
};

const getProductionState = createFeatureSelector<ProductionState>(reducerName);

// Machine State
const getMachineState = createSelector(
    getProductionState,
    (state) => state.machine
);

export const getMachineData = createSelector(
    getMachineState,
    (state) => state.machineData
);

// Messaging
const getMessaging = createSelector(
    getProductionState,
    (state) => state.messaging
);

export const getMessagingData = createSelector(
    getMessaging,
    (state) => state.messagingData
);

export const getMessagingToSave = createSelector(
    getMessaging,
    (state) => state.messagingToSave
);
