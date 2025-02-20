import 'jest';
import * as faker from 'faker/locale/en_US';
import * as Factory from 'factory.ts';
import { Observable } from 'rxjs';
import { cold, hot } from 'jest-marbles';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { ISettingsService } from '@api/services/interfaces/core/isettings.service';
import { SettingsEffects, convertDataInWipUIAndKanBanUIModels } from '../effects/settings.effects';

import { WipDataModelUIFactory, KanbanDataModelUIFactory, WipDataModelUI, KanbanDataModelUI } from '../models/settings.models';

import {
    LoadData,
    LoadDataSuccess,
    UpdateWip,
    UpdateWipSuccess,
    UpdateKanBan,
    UpdateKanBanSuccess,
    SettingsFailure
} from './../actions/settings.actions';
import { IBufferDto } from '@api/models/apimodels';
import * as fromMain from '../../../main/main.reducers.index';

describe('SettingsEffects', () => {
    let actions: Observable<any>;
    let effects: SettingsEffects;
    let settingsService: ISettingsService;

    beforeAll(() => {
        TestBed.configureTestingModule({
        imports: [
            StoreModule.forRoot(fromMain.mainReducers),
        ],
        providers: [
            SettingsEffects,
            provideMockActions(() => actions),
            {
                provide: ISettingsService,
                useValue: {
                    GetBuffersForProduct: jest.fn(),
                    UpdateWip: jest.fn(),
                    UpdateKanBan: jest.fn()
                }
            }
        ]
        }).compileComponents();

        effects = TestBed.get(SettingsEffects);
        settingsService = TestBed.get(ISettingsService);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    describe('load', () => {

        let productId;
        let mockedResponseFromApi;
        let mockedConvertDataFromApi;

        beforeEach(() => {
            productId = faker.random.number();
            mockedResponseFromApi = generateBufferResponseFromApi();
            mockedConvertDataFromApi = convertDataInWipUIAndKanBanUIModels(mockedResponseFromApi);
        });

        it('should return a LoadSuccess action, with the wip and kanban data, on success', () => {
            const action = new LoadData(productId);
            const outcome = new LoadDataSuccess(mockedConvertDataFromApi);

            actions = hot('a', { a: action });
            const response = cold('a|', { a: mockedResponseFromApi });
            const expected = cold('b', { b: outcome });

            settingsService.GetBuffersForProduct = jest.fn(() => response);

            expect(effects.getData$).toBeObservable(expected);

        });

        it('should return an SettingsFailure action, with an error, on failure', () => {

            const action = new LoadData(productId);
            const error = new Error();
            const outcome = new SettingsFailure('error');

            actions = hot('a', { a: action });
            const response = cold('-#|', { a: error });
            const expected = cold('-b', { b: outcome });

            settingsService.GetBuffersForProduct = jest.fn(() => response);

            expect(effects.getData$).toBeObservable(expected);
        });
    });

    describe('update', () => {
        let mockedWipData: WipDataModelUI[];
        let mockedKanBanData: KanbanDataModelUI[];
        let mockedResponseFromApi;

        beforeEach(() => {
            mockedKanBanData = KanbanDataModelUIFactory.buildList(2);
            mockedWipData = WipDataModelUIFactory.buildList(2);
            mockedResponseFromApi = faker.random.boolean();
        });

        it('should return a UpdateWipSuccess action, with a boolean, on success', () => {
            const action = new UpdateWip(mockedWipData);
            const outcome = new UpdateWipSuccess(mockedResponseFromApi);

            actions = hot('a', { a: action });
            const response = cold('a|', { a: mockedResponseFromApi });
            const expected = cold('b', { b: outcome });

            settingsService.UpdateWip = jest.fn(() => response);

            expect(effects.updateWipData$).toBeObservable(expected);

        });

        it('should return a UpdateKanBanSuccess action, with a boolean, on success', () => {
            const action = new UpdateKanBan(mockedKanBanData);
            const outcome = new UpdateKanBanSuccess(mockedResponseFromApi);

            actions = hot('a', { a: action });
            const response = cold('a|', { a: mockedResponseFromApi });
            const expected = cold('b', { b: outcome });

            settingsService.UpdateKanBan = jest.fn(() => response);

            expect(effects.updateKanbanData$).toBeObservable(expected);

        });
    });
});

function generateBufferResponseFromApi(): IBufferDto[] {

    const buffer = Factory.makeFactory<IBufferDto>({
        Id: faker.random.number(),
        ProductId: faker.random.number(),
        Name: faker.random.word(),
        Count: faker.random.number(),
        LowAlertLowerBound: faker.random.number(),
        LowAlertLowWarning: faker.random.number(),
        LowWarningTarget: faker.random.number(),
        TargetHighWarning: faker.random.number(),
        HighWarningHighAlert: faker.random.number(),
        HighAlertUpperBound: faker.random.number()
    });

    return buffer.buildList(2);
}
