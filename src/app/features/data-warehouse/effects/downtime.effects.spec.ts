import 'jest';
import * as faker from 'faker/locale/en_US';
import * as Factory from 'factory.ts';
import { Observable } from 'rxjs';
import { cold, hot } from 'jest-marbles';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { IDownTimeMachiningService } from '@api/services/interfaces/core/data-warehouse/idowntime.service';
import { IMachineService } from '@api/services/interfaces/core/imachine.service';
import { IProductService } from '@api/services/interfaces/core/iproduct.service';
import { DowntimeEffects, converApiDataToChartData, convertApiDataToTableData } from '../effects/downtime.effects';
import { MachiningRequestModelUIFactory, MachiningRequestModelUI, DowntimeDataModelUI } from '../models/downtime.models';

import {
    GetDowntimeData,
    GetDowntimeDataSuccess,
    GetDowntimeDataSelectBoxes,
    GetDowntimeDataSelectBoxesSuccess,
    DowntimeFailure
} from './../actions/downtime.actions';

import { mainReducers } from '../../../main/main.reducers.index';
import { IMachineDowntimeScreenDto, IDowntimeMachineParetoDto, IPagedSet } from '@api/models/apimodels';
import { convertApiDataToSelectBoxes } from './downtime.effects';

describe('Downtime Effects', () => {

    let actions: Observable<any>;
    let effects: DowntimeEffects;
    let downtimeService: IDownTimeMachiningService;
    let machineService: IMachineService;
    let productService: IProductService;

    beforeAll(() => {
        TestBed.configureTestingModule({
        imports: [
            StoreModule.forRoot(mainReducers),
        ],
        providers: [
            DowntimeEffects,
            provideMockActions(() => actions),
            {
                provide: IDownTimeMachiningService,
                useValue: {
                    GetDownTimeData: jest.fn()
                }
            },
            {
                provide: IMachineService,
                useValue: {
                    GetMachines: jest.fn()
                }
            },
            {
                provide: IProductService,
                useValue: {
                    GetProductsList: jest.fn()
                }
            }
        ]
        }).compileComponents();

        effects = TestBed.get(DowntimeEffects);
        downtimeService = TestBed.get(IDownTimeMachiningService);
        machineService = TestBed.get(IMachineService);
        productService = TestBed.get(IProductService);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    describe('load', () => {
        let request: MachiningRequestModelUI;
        let mockedResponseFromApi: IMachineDowntimeScreenDto;
        let mockedConvertDataFromApi: DowntimeDataModelUI;

        beforeEach(() => {
            request = MachiningRequestModelUIFactory.build();
            mockedResponseFromApi = generateMachineDowntimeResponseFromApi();
            mockedConvertDataFromApi = {
                Chart: converApiDataToChartData(mockedResponseFromApi.ChartData),
                Table: convertApiDataToTableData(mockedResponseFromApi.TableData)
            };
        });

        it('should return a GetDowntimeDataSuccess action, with downtime data for chart and table, on success', () => {
            const action = new GetDowntimeData(request);
            const outcome = new GetDowntimeDataSuccess(mockedConvertDataFromApi);

            actions = hot('a', { a: action });
            const response = cold('a|', { a: mockedResponseFromApi });
            const expected = cold('b', { b: outcome });

            downtimeService.GetDownTimeData = jest.fn(() => response);

            expect(effects.getDowntimeData$).toBeObservable(expected);

        });

        it('should return an DowntimeFailure action, with an error, on failure', () => {

            const action = new GetDowntimeData(request);
            const error = new Error();
            const outcome = new DowntimeFailure('error');

            actions = hot('a', { a: action });
            const response = cold('-#|', { a: error });
            const expected = cold('-b', { b: outcome });

            downtimeService.GetDownTimeData = jest.fn(() => response);

            expect(effects.getDowntimeData$).toBeObservable(expected);
        });

    });

    describe('load select boxes', () => {
        let machineSelectBoxData: any[];
        let productSelectBoxData: any[];
        let mockedResponseFromApi: any[];
        let mockedConvertDataFromApi: any[];

        beforeEach(() => {
            machineSelectBoxData = generateMachineSelectBoxResponseFromApi();
            productSelectBoxData = generateProductSelectBoxResponseFromApi();
            mockedResponseFromApi = [machineSelectBoxData, productSelectBoxData];
            mockedConvertDataFromApi = convertApiDataToSelectBoxes(mockedResponseFromApi);
        });

        it('should return a GetDowntimeDataSelectBoxesSuccess action, with select boxes data, on success', () => {
            const action = new GetDowntimeDataSelectBoxes();
            const outcome = new GetDowntimeDataSelectBoxesSuccess(mockedConvertDataFromApi);

            actions = hot('a', { a: action });
            const responseMachine = cold('a|', { a: machineSelectBoxData });
            const responseProduct = cold('a|', { a: productSelectBoxData });
            const expected = cold('-b', { b: outcome });

            machineService.GetMachines = jest.fn(() => responseMachine);
            productService.GetProductsList = jest.fn(() => responseProduct);

            expect(effects.getDowntimeDataSelectBox$).toBeObservable(expected);
        });

        it('should return an DowntimeFailure action when load machine select box fails, with an error, on failure', () => {

            const action = new GetDowntimeDataSelectBoxes();
            const error = new Error();
            const outcome = new DowntimeFailure('error');

            actions = hot('a', { a: action });
            const responseMachine = cold('-#|', { a: error });
            const responseProduct = cold('a|', { a: productSelectBoxData });
            const expected = cold('-b', { b: outcome });

            machineService.GetMachines = jest.fn(() => responseMachine);
            productService.GetProductsList = jest.fn(() => responseProduct);

            expect(effects.getDowntimeDataSelectBox$).toBeObservable(expected);
        });

        it('should return an DowntimeFailure action when load product select box fails, with an error, on failure', () => {

            const action = new GetDowntimeDataSelectBoxes();
            const error = new Error();
            const outcome = new DowntimeFailure('error');

            actions = hot('a', { a: action });
            const responseProduct = cold('-#|', { a: error });
            const responseMachine = cold('a|', { a: machineSelectBoxData });
            const expected = cold('-b', { b: outcome });

            machineService.GetMachines = jest.fn(() => responseMachine);
            productService.GetProductsList = jest.fn(() => responseProduct);

            expect(effects.getDowntimeDataSelectBox$).toBeObservable(expected);
        });
    });
});

function generateMachineDowntimeResponseFromApi(): IMachineDowntimeScreenDto {

    const chartData = Factory.makeFactory<IDowntimeMachineParetoDto>({
        AssetNumber: faker.random.word(),
        DowntimeInMinutes: faker.random.number(),
        InstancesOfDowntime: faker.random.number()
    }).buildList(3);

    const tableData = Factory.makeFactory<IPagedSet<IDowntimeMachineParetoDto>>({
        Result: chartData,
        Total: faker.random.number()
    }).build();

    const downtime = Factory.makeFactory<IMachineDowntimeScreenDto>({
        ChartData: chartData,
        TableData: tableData
    }).build();

    return downtime;
}

export function generateMachineSelectBoxResponseFromApi(): any[] {

    const machine = Factory.makeFactory<any>({
        Name: faker.random.word(),
        Id: faker.random.number()
    }).buildList(3);

    return machine;
}

export function generateProductSelectBoxResponseFromApi(): any[] {

    const product = Factory.makeFactory<any>({
        Name: faker.random.word(),
        Id: faker.random.number()
    }).buildList(2);

    return product;
}
