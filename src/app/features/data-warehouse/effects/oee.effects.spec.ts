import 'jest';
import * as faker from 'faker/locale/en_US';
import * as Factory from 'factory.ts';
import { Observable } from 'rxjs';
import { cold, hot } from 'jest-marbles';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { IOeeMachiningService } from '@api/services/interfaces/core/data-warehouse/ioee.service';
import { IMachineService } from '@api/services/interfaces/core/imachine.service';
import { IProductService } from '@api/services/interfaces/core/iproduct.service';
import { OeeEffects, convertApiDataToChartData, convertApiDataToTableData } from '../effects/oee.effects';
import { OeeDataModelUI } from '../models/oee.models';
import { MachiningRequestModelUIFactory, MachiningRequestModelUI } from '../models/downtime.models';

import {
    GetOeeData,
    GetOeeDataSuccess,
    GetOeeDataSelectBoxes,
    GetOeeDataSelectBoxesSuccess,
    OeeFailure
} from './../actions/oee.actions';

import { mainReducers } from '../../../main/main.reducers.index';
import { IOEEScreenDto, IPagedSet, IOEEChartDto, IOEETableDto, IOEEChartSeries } from '@api/models/apimodels';
import { convertApiDataToSelectBoxes } from './downtime.effects';
import { generateMachineSelectBoxResponseFromApi, generateProductSelectBoxResponseFromApi } from './downtime.effects.spec';

describe('Downtime Effects', () => {

    let actions: Observable<any>;
    let effects: OeeEffects;
    let oeeService: IOeeMachiningService;
    let machineService: IMachineService;
    let productService: IProductService;

    beforeAll(() => {
        TestBed.configureTestingModule({
        imports: [
            StoreModule.forRoot(mainReducers),
        ],
        providers: [
            OeeEffects,
            provideMockActions(() => actions),
            {
                provide: IOeeMachiningService,
                useValue: {
                    GetOeeData: jest.fn()
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

        effects = TestBed.get(OeeEffects);
        oeeService = TestBed.get(IOeeMachiningService);
        machineService = TestBed.get(IMachineService);
        productService = TestBed.get(IProductService);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    describe('load', () => {
        let request: MachiningRequestModelUI;
        let mockedResponseFromApi: IOEEScreenDto;
        let mockedConvertDataFromApi: OeeDataModelUI;

        beforeEach(() => {
            request = MachiningRequestModelUIFactory.build();
            mockedResponseFromApi = {
                ChartData: [
                    {
                        Name: 'Series',
                        Series: [
                            {
                                Name: 'Value One',
                                Value: 1.5
                            },
                            {
                                Name: 'Value two',
                                Value: 3
                            },
                            {
                                Name: 'Value three',
                                Value: 5
                            }
                        ]
                    },
                    {
                        Name: 'Series 2',
                        Series: [
                            {
                                Name: 'Value One',
                                Value: 1
                            },
                            {
                                Name: 'Value two',
                                Value: 4
                            },
                            {
                                Name: 'Value three',
                                Value: 2
                            }
                        ]
                    }
                ],
                TableData: {
                    Result: [
                        {
                            Name: 'Value One',
                            Availability: 1,
                            Production: 1,
                            Quality: 1
                        },
                        {
                            Name: 'Value Two',
                            Availability: 2,
                            Production: 2,
                            Quality: 2
                        }
                    ],
                    Total: 2
                }
            };
            mockedConvertDataFromApi = {
                Chart: convertApiDataToChartData(mockedResponseFromApi.ChartData),
                Table: convertApiDataToTableData(mockedResponseFromApi.TableData)
            };
        });

        it('should return a GetOeeDataSuccess action, with oee data for chart and table, on success', () => {
            const action = new GetOeeData(request);
            const outcome = new GetOeeDataSuccess(mockedConvertDataFromApi);

            actions = hot('a', { a: action });
            const response = cold('a|', { a: mockedResponseFromApi });
            const expected = cold('b', { b: outcome });

            oeeService.GetOeeData = jest.fn(() => response);

            expect(effects.getOeeData$).toBeObservable(expected);
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

        it('should return a GetOeeDataSelectBoxesSuccess action, with select boxes data, on success', () => {
            const action = new GetOeeDataSelectBoxes();
            const outcome = new GetOeeDataSelectBoxesSuccess(mockedConvertDataFromApi);

            actions = hot('a', { a: action });
            const responseMachine = cold('a|', { a: machineSelectBoxData });
            const responseProduct = cold('a|', { a: productSelectBoxData });
            const expected = cold('-b', { b: outcome });

            machineService.GetMachines = jest.fn(() => responseMachine);
            productService.GetProductsList = jest.fn(() => responseProduct);

            expect(effects.getOeeDataSelectBox$).toBeObservable(expected);
        });

        it('should return an OeeFailure action when load machine select box fails, with an error, on failure', () => {

            const action = new GetOeeDataSelectBoxes();
            const error = new Error();
            const outcome = new OeeFailure('error');

            actions = hot('a', { a: action });
            const responseMachine = cold('-#|', { a: error });
            const responseProduct = cold('a|', { a: productSelectBoxData });
            const expected = cold('-b', { b: outcome });

            machineService.GetMachines = jest.fn(() => responseMachine);
            productService.GetProductsList = jest.fn(() => responseProduct);

            expect(effects.getOeeDataSelectBox$).toBeObservable(expected);
        });

        it('should return an OeeFailure action when load product select box fails, with an error, on failure', () => {

            const action = new GetOeeDataSelectBoxes();
            const error = new Error();
            const outcome = new OeeFailure('error');

            actions = hot('a', { a: action });
            const responseProduct = cold('-#|', { a: error });
            const responseMachine = cold('a|', { a: machineSelectBoxData });
            const expected = cold('-b', { b: outcome });

            machineService.GetMachines = jest.fn(() => responseMachine);
            productService.GetProductsList = jest.fn(() => responseProduct);

            expect(effects.getOeeDataSelectBox$).toBeObservable(expected);
        });
    });

});

function generateMachineOeeResponseFromApi(): IOEEScreenDto {

    const series = Factory.makeFactory<IOEEChartSeries>({
        Name: faker.random.word(),
        Value: faker.random.number()
    }).buildList(2);

    const chartData = Factory.makeFactory<IOEEChartDto>({
        Name: faker.random.word(),
        Series: series
    }).buildList(3);

    const tableRows = Factory.makeFactory<IOEETableDto>({
        Name: faker.random.word(),
        Availability: faker.random.number(),
        Production: faker.random.number(),
        Quality: faker.random.number()
    }).buildList(3);

    const tableData = Factory.makeFactory<IPagedSet<IOEETableDto>>({
        Result: tableRows,
        Total: faker.random.number()
    }).build();

    const oee = Factory.makeFactory<IOEEScreenDto>({
        ChartData: chartData,
        TableData: tableData
    }).build();

    return oee;
}
