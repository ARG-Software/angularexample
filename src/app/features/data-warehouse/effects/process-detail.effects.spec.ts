import 'jest';
import * as faker from 'faker/locale/en_US';
import * as Factory from 'factory.ts';
import { Observable } from 'rxjs';
import { cold, hot } from 'jest-marbles';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { IProcessDetailMachiningService } from '@api/services/interfaces/core/data-warehouse/iprocess-detail.service';
import {
    ProcessDetailEffects,
    convertApiDataToProcessDetailTableModelUI,
    convertApiDataToProcessDetailChartModelUI
} from '../effects/process-detail.effects';
import { ProcessDetailDataModelUI } from '../models/process-detail.models';

import { MachiningRequestModelUIFactory, MachiningRequestModelUI } from '../models/downtime.models';

import {
    GetProcessDetailData,
    GetProcessDetailDataSuccess,
    GetProcessDetailDataSelectBoxes,
    GetProcessDetailDataSelectBoxesSuccess,
    ProcessDetailFailure
} from './../actions/process-detail.actions';

import { mainReducers } from '../../../main/main.reducers.index';
import { IPagedSet } from '@api/models/apimodels';
import { IMachineService } from '@api/services/interfaces/core/imachine.service';
import { convertApiDataToSelectBox } from './process-detail.effects';
import { generateMachineSelectBoxResponseFromApi, generateProductSelectBoxResponseFromApi } from './downtime.effects.spec';

describe('Process Detail Effects', () => {

    let actions: Observable<any>;
    let effects: ProcessDetailEffects;
    let processDetailService: IProcessDetailMachiningService;
    let machineService: IMachineService;

    beforeAll(() => {
        TestBed.configureTestingModule({
        imports: [
            StoreModule.forRoot(mainReducers),
        ],
        providers: [
            ProcessDetailEffects,
            provideMockActions(() => actions),
            {
                provide: IProcessDetailMachiningService,
                useValue: {
                    GetProcessDetailData: jest.fn()
                }
            },
            {
                provide: IMachineService,
                useValue: {
                    GetMachines: jest.fn()
                }
            }
        ]
        }).compileComponents();

        effects = TestBed.get(ProcessDetailEffects);
        processDetailService = TestBed.get(IProcessDetailMachiningService);
        machineService = TestBed.get(IMachineService);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    describe('load', () => {
        let request: MachiningRequestModelUI;
        let mockedResponseFromApi: any[];
        let mockedConvertDataFromApi: ProcessDetailDataModelUI;

        beforeEach(() => {
            request = MachiningRequestModelUIFactory.build();
            mockedResponseFromApi = [
                    {
                        Id: null,
                        MachineState: 'Not Scheduled',
                        Reason: '',
                        Duration: 60,
                        StartTime: '2018-11-08T00:00:00',
                        EndTime: '2018-11-08T01:00:00'
                    },
                    {
                        Id: null,
                        MachineState: 'In Production',
                        Reason: '',
                        Duration: 300,
                        StartTime: '2018-11-08T01:00:00',
                        EndTime: '2018-11-08T06:00:00'
                    },
                    {
                        Id: null,
                        MachineState: 'Unplanned Downtime',
                        Reason: 'Tool Change',
                        Duration: 20,
                        StartTime: '2018-11-08T06:00:00',
                        EndTime: '2018-11-08T06:20:00'
                    },
                    {
                        Id: null,
                        MachineState: 'In Production',
                        Reason: '',
                        Duration: 360,
                        StartTime: '2018-11-08T06:20:00',
                        EndTime: '2018-11-08T12:20:00'
                    },
                    {
                        Id: null,
                        MachineState: 'Unplanned Downtime',
                        Reason: 'No reason given',
                        Duration: 100,
                        StartTime: '2018-11-08T12:20:00',
                        EndTime: '2018-11-08T14:00:00'
                    },
                    {
                        Id: null,
                        MachineState: 'In Production',
                        Reason: '',
                        Duration: 20,
                        StartTime: '2018-11-08T14:00:00',
                        EndTime: '2018-11-08T14:20:00'
                    },
                    {
                        Id: null,
                        MachineState: 'Not Scheduled',
                        Reason: '',
                        Duration: 360,
                        StartTime: '2018-11-08T14:20:00',
                        EndTime: '2018-11-08T20:00:00'
                    }
            ];
            mockedConvertDataFromApi = {
                Chart: convertApiDataToProcessDetailChartModelUI(mockedResponseFromApi),
                Table: convertApiDataToProcessDetailTableModelUI(mockedResponseFromApi)
            };
        });

        it('should return a GetProcessDetailDataSuccess action, with process detail data for chart and table, on success', () => {
            const action = new GetProcessDetailData(request);
            const outcome = new GetProcessDetailDataSuccess(mockedConvertDataFromApi);

            actions = hot('a', { a: action });
            const response = cold('a|', { a: mockedResponseFromApi });
            const expected = cold('b', { b: outcome });

            processDetailService.GetProcessDetailData = jest.fn(() => response);

            expect(effects.getProcessDetailData$).toBeObservable(expected);

        });
    });

    describe('load select boxes', () => {
        let mockedResponseFromApi: any[];
        let mockedConvertDataFromApi: any[];

        beforeEach(() => {
            mockedResponseFromApi = generateMachineSelectBoxResponseFromApi();
            mockedConvertDataFromApi = convertApiDataToSelectBox(mockedResponseFromApi);
        });

        it('should return a GetProcessDetailDataSelectBoxesSuccess action, with select boxes data, on success', () => {
            const action = new GetProcessDetailDataSelectBoxes();
            const outcome = new GetProcessDetailDataSelectBoxesSuccess(mockedConvertDataFromApi);

            actions = hot('a', { a: action });
            const responseMachine = cold('a|', { a: mockedResponseFromApi });
            const expected = cold('b', { b: outcome });

            machineService.GetMachines = jest.fn(() => responseMachine);

            expect(effects.getProcessDetailDataSelectBox$).toBeObservable(expected);
        });

        it('should return an ProcessDetailFailure action when load machine select box fails, with an error, on failure', () => {

            const action = new GetProcessDetailDataSelectBoxes();
            const error = new Error();
            const outcome = new ProcessDetailFailure('error');

            actions = hot('a', { a: action });
            const responseMachine = cold('-#|', { a: error });
            const expected = cold('-b', { b: outcome });

            machineService.GetMachines = jest.fn(() => responseMachine);

            expect(effects.getProcessDetailDataSelectBox$).toBeObservable(expected);
        });
    });
});

function generateProcessDetailResponseFromApi(): any {

    const chartData = Factory.makeFactory<any>({
        Id: faker.random.number(),
        MachineState: faker.random.word(),
        Reason: faker.random.word(),
        Duration: faker.random.number(),
        StartTime: faker.random.locale()
    }).buildList(3);

    const tableData = Factory.makeFactory<IPagedSet<any>>({
        Result: chartData,
        Total: faker.random.number()
    }).build();

    const processDetail = Factory.makeFactory<any>({
        ChartData: chartData,
        TableData: tableData
    }).build();

    return processDetail;
}
