import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { catchError, switchMap, map, tap, finalize } from 'rxjs/operators';

import {  } from '@api/models/apimodels';
import { of } from 'rxjs/observable/of';

import * as MimsModels from '@api/models/apimodels';

import {
    GetOeeData,
    GetOeeDataSuccess,
    OeeFailure,
    GetOeeDataSelectBoxes,
    GetOeeDataSelectBoxesSuccess,
    OeeActionTypes
} from '../actions/oee.actions';

import {
    OeeTableDataModelUI,
    OeeDataModelUI,
    OeeChartDataModelUI,
    OeeValuesChartModelUI,
    OeeTableInformationModelUI
} from '../models/oee.models';

import { IOeeMachiningService } from '@api/services/interfaces/core/data-warehouse/ioee.service';

import * as fromMain from '../../../main/main.reducers.index';
import * as loadingActions from '../../../main/actions/loading.actions';

import { IMachineService } from '@api/services/interfaces/core/imachine.service';
import { IProductService } from '@api/services/interfaces/core/iproduct.service';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { convertApiDataToSelectBoxes } from './downtime.effects';

@Injectable()
export class OeeEffects {

    @Effect()
    public getOeeData$ = this.actions$.pipe(
        ofType<GetOeeData>(OeeActionTypes.GetOeeData),
        tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
        map((action) => {
            const request: MimsModels.DWMachiningDowntimeScreenRequestDto = {
                DWMachiningFilterDto: {
                    StartDate: new Date(action.payload.Filters.StartDate),
                    EndDate: new Date(action.payload.Filters.EndDate),
                    MachineId: action.payload.Filters.MachineId,
                    ProductId: action.payload.Filters.ProductId
                },
                Paging: action.payload.Paging,
            };

            return request;
        }),
        switchMap((payload) =>

            Observable.of({
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
            })

            // TODO: When backend is finished, uncomment service and the load tests
            // this.oeeService.GetOeeData(payload)

            .pipe(
                map((response: MimsModels.IOEEScreenDto) => {
                    const oeeData: OeeDataModelUI = {
                        Chart: convertApiDataToChartData(response.ChartData),
                        Table: convertApiDataToTableData(response.TableData)
                    };

                    return new GetOeeDataSuccess(oeeData);
                }),
                finalize(() => this.mainStore$.dispatch(new loadingActions.HideLoading())),
                catchError((error) => {
                    return of(new OeeFailure(error));
                })
            )
        )
    );

    @Effect({ dispatch: false })
    public getOeeDataSuccess$ = this.actions$.pipe(
        ofType<GetOeeDataSuccess>(OeeActionTypes.GetOeeDataSuccess)
    );

    @Effect()
    public getOeeDataSelectBox$ = this.actions$.pipe(
        ofType<GetOeeDataSelectBoxes>(OeeActionTypes.GetOeeDataSelectBoxes),
        tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
        switchMap(() =>
            forkJoin(
                this.machineService.GetMachines(),
                this.productService.GetProductsList()
            )
            .pipe(
                map((response: any[]) => {
                    return new GetOeeDataSelectBoxesSuccess(convertApiDataToSelectBoxes(response));
                }),
                finalize(() => this.mainStore$.dispatch(new loadingActions.HideLoading())),
                catchError((error) => {
                    return of(new OeeFailure(error));
                })
            )
        )
    );

    @Effect({ dispatch: false })
    public getOeeDataSelectBoxSuccess$ = this.actions$.pipe(
        ofType<GetOeeDataSelectBoxesSuccess>(OeeActionTypes.GetOeeDataSelectBoxesSuccess)
    );

    @Effect({ dispatch: false })
        public oeeFailure$ = this.actions$.pipe(
        ofType<OeeFailure>(OeeActionTypes.OeeFailure),
        tap((error) => {
            console.log('error');
        })
    );

    public constructor(
        private oeeService: IOeeMachiningService,
        private machineService: IMachineService,
        private productService: IProductService,
        private actions$: Actions,
        private mainStore$: Store<fromMain.MainState>
    ) {}
}

/**
 * Manipulate api data to be readable by table
 * @param data data from api to be manipulated
 * @returns data formated soo the data can be read by table
 */
export function convertApiDataToTableData(
    data: MimsModels.IPagedSet<MimsModels.IOEETableDto>
): OeeTableInformationModelUI {

    const rowsData: OeeTableDataModelUI[] = [];

    data.Result.forEach((elem) => {
        rowsData.push({
            Product: elem.Name,
            Availability: elem.Availability,
            Production: elem.Production,
            Quality: elem.Quality
        });
    });

    return {
        Information: rowsData,
        Total: data.Total
    };
}

/**
 * Manipulate api data to be readable by chart
 * @param data data from api to be manipulated
 * @returns data formated soo the data can be read by chart
 */
export function convertApiDataToChartData(data: MimsModels.IOEEChartDto[]): OeeChartDataModelUI[] {

    const chart: OeeChartDataModelUI[] = [];
    let series: OeeValuesChartModelUI[] = [];

    data.forEach((elem) => {
        elem.Series.forEach((serie) => {
            series.push({
                name: serie.Name,
                value: serie.Value
            });
        });
        chart.push({
            name: elem.Name,
            series
        });
        series = [];
    });

    return chart;
}
