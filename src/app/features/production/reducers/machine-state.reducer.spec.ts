import { reducer, initialState, findAndUpdateMachine } from './machine-state.reducer';

import {
    GetMachineDataSuccess,
    MachineFailure,
    UpdateMachineData,
    UpdateMachineDataSuccess
} from '../actions/machine-state.actions';

import {
    MachineStateSaveDataModelUI,
    MachineStateLoadDataModelUIFactory
} from '../models/machine-state.model';

describe('Machine State Reducer', () => {

    const mockedData = MachineStateLoadDataModelUIFactory;

    const updateExistingData: MachineStateSaveDataModelUI[] = [];
    updateExistingData.push({
        Id: mockedData[0].Id,
        Option: mockedData[0].Options[0]
    });

    describe('Undefined Action', () => {
        it('should return the default state', () => {

            const action = { type: 'Not defined action' } as any;
            const result = reducer(undefined, action);

            expect(result).toEqual(initialState);
        });
    });

    describe('[Machine] Machine Failed', () => {
        it('should return actual state if failure action is dispatched', () => {

            const action = new MachineFailure({});
            const result = reducer(initialState, action);

            expect(result).toEqual(initialState);
        });
    });

    describe('[Machine] Get machine state data success', () => {

        it('should return machine state data when action GetMachineDataSuccess is dispatched', () => {

            const action = new GetMachineDataSuccess(mockedData);
            const received = reducer(initialState, action);

            expect(received).toEqual({
                ...initialState,
                machineData: action.payload
            });
        });
    });

    describe('[Machine] Update machine state data', () => {
        it('should return machine state with updated data when action UpdateMachineData is dispatched', () => {
            const action = new UpdateMachineData(updateExistingData[0]);
            const received = reducer(initialState, action);

            expect(received).toEqual({
                ...initialState,
                machineData: findAndUpdateMachine(initialState.machineData, updateExistingData[0])
            });
        });
    });

    describe('[Machine] Update machine state data success', () => {
        it('should return true when action UpdateMachineDataSuccess is dispatched', () => {

            const action = new UpdateMachineDataSuccess(true);
            const received = reducer(initialState, action);

            expect(received).toEqual(initialState);
        });
    });
});
