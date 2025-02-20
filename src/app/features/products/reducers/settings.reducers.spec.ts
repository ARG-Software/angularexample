import { reducer, initialState } from './settings.reducers';
import {
    LoadDataSuccess,
    UpdateWip,
    UpdateWipSuccess,
    UpdateKanBan,
    UpdateKanBanSuccess,
    SettingsFailure
} from '../actions/settings.actions';
import {
    WipDataModelUIFactory,
    KanbanDataModelUIFactory
} from '../models/settings.models';

describe('Settings Reducer', () => {

    const mockedWipData = WipDataModelUIFactory.buildList(2);
    const mockedKanbanData = KanbanDataModelUIFactory.buildList(2);

    const mockedLoadSuccessData = {
        Wip: mockedWipData,
        Kanban: mockedKanbanData
    };

    describe('Undefined Action', () => {
        it('should return the default state', () => {

            const action = { type: 'Not defined action' } as any;
            const result = reducer(undefined, action);

            expect(result).toEqual(initialState);
        });
    });

    describe('[Settings] Settings Failed', () => {
        it('should return actual state if failure action is dispatched', () => {

            const action = new SettingsFailure({});
            const result = reducer(initialState, action);

            expect(result).toEqual(initialState);
        });
    });

    describe('[Settings] Load Data (WIP, KanBan) Success', () => {

        it('should return wip, kanban data when action LoadDataSuccess is dispatched', () => {

            const action = new LoadDataSuccess(mockedLoadSuccessData);
            const received = reducer(initialState, action);

            expect(received).toEqual({
                ...initialState,
                wipData: action.payload.Wip,
                kanBanData: action.payload.Kanban
            });
        });
    });

    describe('[Settings] Update WIP', () => {
        it('should return wip request with updated data when action UpdateWip is dispatched', () => {
            const action = new UpdateWip(mockedWipData);
            const received = reducer(initialState, action);

            expect(received).toEqual({
                ...initialState, wipData: action.payload
            });
        });
    });

    describe('[Settings] Update WIP Success', () => {
        it('should return true when action UpdateWipSuccess is dispatched', () => {

            const action = new UpdateWipSuccess(true);
            const received = reducer(initialState, action);

            expect(received).toEqual(initialState);
        });
    });

    describe('[Settings] Update Kan-Ban Limits', () => {
        it('should return kanban request with updated data when action UpdateKanBan is dispatched', () => {

            const action = new UpdateKanBan(mockedKanbanData);
            const received = reducer(initialState, action);

            expect(received).toEqual({
                ...initialState, kanBanData: action.payload
            });
        });
    });

    describe('[Settings] Update Kan-Ban Limits Success', () => {
        it('should return true when action UpdateKanbanSuccess is dispatched', () => {

            const dataSuccess = new UpdateKanBanSuccess(true);
            const received = reducer(initialState, dataSuccess);

            expect(received).toEqual(initialState);
        });
    });
});
