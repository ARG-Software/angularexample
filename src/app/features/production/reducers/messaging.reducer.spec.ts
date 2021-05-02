import { reducer, initialState, findAndUpdateMessagingToSave, updateOptionLoadData, updateOptionSaveData } from './messasing.reducer';

import {
    GetMessagingDataSuccess,
    MessagingFailure,
    UpdateMessagingDataSuccess,
    ChangeCheckbox,
    ChangeSelectbox
} from '../actions/messaging.actions';

import {
    MessagingSaveDataModelUI,
    MessagingLoadDataModelUIFactory,
    MessagingLoadDataModelUI
} from '../models/messaging.model';

describe('Messaging Reducer', () => {

    const mockedData: MessagingLoadDataModelUI[] = MessagingLoadDataModelUIFactory;

    const updateExistingData: MessagingSaveDataModelUI = {
        Id: mockedData[0].Id,
        Option: mockedData[0].Options[0]
    };

    const manipulatedState = {
        messagingData: MessagingLoadDataModelUIFactory,
        messagingToSave: [updateExistingData]
    };

    describe('Undefined Action', () => {
        it('should return the default state', () => {

            const action = { type: 'Not defined action' } as any;
            const result = reducer(undefined, action);

            expect(result).toEqual(initialState);
        });
    });

    describe('[Messaging] Messaging Failed', () => {
        it('should return actual state if failure action is dispatched', () => {

            const action = new MessagingFailure({});
            const result = reducer(initialState, action);

            expect(result).toEqual(initialState);
        });
    });

    describe('[Messaging] Get messaging data success', () => {

        it('should return messaging data when action GetMessagingDataSuccess is dispatched', () => {

            const action = new GetMessagingDataSuccess(mockedData);
            const received = reducer(initialState, action);

            expect(received).toEqual({
                ...initialState,
                messagingData: action.payload
            });
        });
    });

    describe('[Messaging] Add/Remove from messagings to save', () => {

        it('should return messaging data to save with updated information when action ChangeCheckbox is dispatched', () => {

            const action = new ChangeCheckbox(mockedData[0].Id);
            const received = reducer(manipulatedState, action);

            expect(received).toEqual({
                ...manipulatedState,
                messagingToSave: findAndUpdateMessagingToSave(manipulatedState.messagingToSave, manipulatedState.messagingData, action.payload)
            });
        });

        it('should return messaging data with the new selected option when action ChangeSelectbox is dispatched', () => {

            const action = new ChangeSelectbox(updateExistingData);
            const received = reducer(manipulatedState, action);

            expect(received).toEqual({
                ...manipulatedState,
                messagingData: updateOptionLoadData(manipulatedState.messagingData, action.payload),
                messagingToSave: updateOptionSaveData(manipulatedState.messagingToSave, action.payload)
            });
        });
    });

    describe('[Messaging] Change the messaging option', () => {

        it('should return messaging data with the new selected option when action ChangeSelectbox is dispatched', () => {

            const action = new ChangeSelectbox(updateExistingData);
            const received = reducer(manipulatedState, action);

            expect(received).toEqual({
                ...manipulatedState,
                messagingData: updateOptionLoadData(manipulatedState.messagingData, action.payload),
                messagingToSave: updateOptionSaveData(manipulatedState.messagingToSave, action.payload)
            });
        });
    });

    describe('[Messaging] Update messaging data success', () => {
        it('should return true when action UpdateMessagingDataSuccess is dispatched', () => {

            const action = new UpdateMessagingDataSuccess(true);
            const received = reducer(initialState, action);

            expect(received).toEqual(initialState);
        });
    });
});
