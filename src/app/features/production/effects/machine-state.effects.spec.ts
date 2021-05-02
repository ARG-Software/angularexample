import 'jest';
import { Observable } from 'rxjs';
import { cold, hot } from 'jest-marbles';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { IMachineStateService } from '@api/services/interfaces/core/production/imachine-state.service';
import { MachineStateEffects } from '../effects/machine-state.effects';
import {
    MachineStateDataRequestModelUI,
    MachineStateLoadDataModelUI,
    MachineStateSaveDataModelUI,
    MachineStateDataRequestModelUIFactory,
    MachineStateLoadDataModelUIFactory,
    MachineStateSaveDataModelUIFactory
} from '../models/machine-state.model';

import {
    GetMachineData,
    GetMachineDataSuccess,
    MachineFailure,
    UpdateMachineData,
    UpdateMachineDataSuccess
} from '../actions/machine-state.actions';

import { mainReducers } from '../../../main/main.reducers.index';

describe('Machine State Effects', () => {

    const functionUtils = require('../../../utils/funtion.utils');

    let actions: Observable<any>;
    let effects: MachineStateEffects;
    let machineStateService: IMachineStateService;

    beforeAll(() => {
        TestBed.configureTestingModule({
        imports: [
            StoreModule.forRoot(mainReducers),
        ],
        providers: [
            MachineStateEffects,
            provideMockActions(() => actions),
            {
                provide: IMachineStateService,
                useValue: {
                    GetMachineStateData: jest.fn(),
                    UpdateMachineStateData: jest.fn()
                }
            }
        ]
        }).compileComponents();

        effects = TestBed.get(MachineStateEffects);
        machineStateService = TestBed.get(IMachineStateService);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    describe('load', () => {
        let request: MachineStateDataRequestModelUI;
        let mockedResponseFromApi: MachineStateLoadDataModelUI[];

        beforeEach(() => {
            request = MachineStateDataRequestModelUIFactory;
            mockedResponseFromApi = MachineStateLoadDataModelUIFactory;
        });

        it('should return a GetMachineDataSuccess action, with machine state data, on success', () => {
            const action = new GetMachineData(request);
            const outcome = new GetMachineDataSuccess(mockedResponseFromApi);

            actions = hot('a', { a: action });
            const response = cold('a|', { a: mockedResponseFromApi });
            const expected = cold('b', { b: outcome });

            functionUtils.apiRequest = jest.fn(() => response);

            expect(effects.getMachineStateData$).toBeObservable(expected);
        });

        it('should return an MachineFailure action, with an error, on failure', () => {

            const action = new GetMachineData(request);
            const error = new Error();
            const outcome = new MachineFailure('error');

            actions = hot('a', { a: action });
            const response = cold('-#|', { a: error });
            const expected = cold('-b', { b: outcome });

            functionUtils.apiRequest = jest.fn(() => response);

            expect(effects.getMachineStateData$).toBeObservable(expected);
        });
    });

    describe('update', () => {
        let mockedMachineStateData: MachineStateSaveDataModelUI;
        let mockedResponseFromApi: boolean;

        beforeEach(() => {
            mockedMachineStateData = MachineStateSaveDataModelUIFactory;
            mockedResponseFromApi = true;
        });

        it('should return a UpdateMachineDataSuccess action, with a boolean, on success', () => {
            const action = new UpdateMachineData(mockedMachineStateData);
            const outcome = new UpdateMachineDataSuccess(mockedResponseFromApi);

            actions = hot('a', { a: action });
            const response = cold('a|', { a: mockedResponseFromApi });
            const expected = cold('b', { b: outcome });

            functionUtils.apiRequest = jest.fn(() => response);

            expect(effects.updateMachineState$).toBeObservable(expected);

        });

        it('should return an MachineFailure action, with an error, on failure', () => {

            const action = new UpdateMachineData(mockedMachineStateData);
            const error = new Error();
            const outcome = new MachineFailure('error');

            actions = hot('a', { a: action });
            const response = cold('-#|', { a: error });
            const expected = cold('-b', { b: outcome });

            functionUtils.apiRequest = jest.fn(() => response);

            expect(effects.updateMachineState$).toBeObservable(expected);
        });
    });
});
