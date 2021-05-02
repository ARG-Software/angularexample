import 'jest';
import { Observable } from 'rxjs';
import { cold, hot } from 'jest-marbles';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { IMessagingService } from '@api/services/interfaces/core/production/imessaging.service';
import { MessagingEffects } from '../effects/messaging.effects';

import {
    GetMessagingData,
    GetMessagingDataSuccess,
    MessagingFailure,
    UpdateMessagingData,
    UpdateMessagingDataSuccess
} from '../actions/messaging.actions';

import {
    MessagingLoadDataModelUI,
    MessagingRequestModelUI,
    MessagingSaveDataModelUI,
    MessagingLoadDataModelUIFactory,
    MessagingRequestModelUIFactory,
    MessagingSaveDataModelUIFactory
} from '../models/messaging.model';

import { mainReducers } from '../../../main/main.reducers.index';

describe('Messaging Effects', () => {

    const functionUtils = require('../../../utils/funtion.utils');

    let actions: Observable<any>;
    let effects: MessagingEffects;
    let messagingService: IMessagingService;

    beforeAll(() => {
        TestBed.configureTestingModule({
        imports: [
            StoreModule.forRoot(mainReducers)
        ],
        providers: [
            MessagingEffects,
            provideMockActions(() => actions),
            {
                provide: IMessagingService,
                useValue: {
                    GetMessagingData: jest.fn(),
                    UpdateMessagingData: jest.fn()
                }
            }
        ]
        }).compileComponents();

        effects = TestBed.get(MessagingEffects);
        messagingService = TestBed.get(IMessagingService);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    describe('load', () => {
        let request: MessagingRequestModelUI;
        let mockedResponseFromApi: MessagingLoadDataModelUI[];

        beforeEach(() => {
            request = MessagingRequestModelUIFactory;
            mockedResponseFromApi = MessagingLoadDataModelUIFactory;
        });

        it('should return a GetMessagingDataSuccess action, with machine state data, on success', () => {
            const action = new GetMessagingData(request);
            const outcome = new GetMessagingDataSuccess(mockedResponseFromApi);

            actions = hot('a', { a: action });
            const response = cold('a|', { a: MessagingLoadDataModelUIFactory });
            const expected = cold('b', { b: outcome });

            functionUtils.apiRequest = jest.fn(() => response);

            expect(effects.getMessagingData$).toBeObservable(expected);
        });

        it('should return an MessagingFailure action, with an error, on failure', () => {

            const action = new GetMessagingData(request);
            const error = new Error();
            const outcome = new MessagingFailure('error');

            actions = hot('a', { a: action });
            const response = cold('-#|', { a: error });
            const expected = cold('-b', { b: outcome });

            functionUtils.apiRequest = jest.fn(() => response);

            expect(effects.getMessagingData$).toBeObservable(expected);
        });
    });

    describe('update', () => {

        let mockedMessaging: MessagingSaveDataModelUI[];
        let mockedResponseFromApi: boolean;

        beforeEach(() => {
            mockedMessaging = [MessagingSaveDataModelUIFactory];
            mockedResponseFromApi = true;
        });

        it('should return a UpdateMachineDataSuccess action, with a boolean, on success', () => {

            const action = new UpdateMessagingData(mockedMessaging);
            const outcome = new UpdateMessagingDataSuccess(mockedResponseFromApi);

            actions = hot('a', { a: action });
            const response = cold('a|', { a: mockedResponseFromApi });
            const expected = cold('b', { b: outcome });

            functionUtils.apiRequest = jest.fn(() => response);

            expect(effects.updateMessaging$).toBeObservable(expected);

        });

        it('shouldaaaa return an MessagingFailure action, with an error, on failure', () => {

            const action = new UpdateMessagingData(mockedMessaging);
            const error = new Error();
            const outcome = new MessagingFailure('error');

            actions = hot('a', { a: action });
            const response = cold('-#|', { a: error });
            const expected = cold('-b', { b: outcome });

            functionUtils.apiRequest = jest.fn(() => response);

            expect(effects.updateMessaging$).toBeObservable(expected);
        });
    });
});
