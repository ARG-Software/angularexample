import { Injectable } from '@angular/core';
import { IMachineService } from '@api/services/interfaces/core/imachine.service';
import { MimsSelectBoxModel } from '@mimsUI/input/select-box/models/select-box.model';
import { IProcessDetailMachiningService } from '@api/services/interfaces/core/data-warehouse/iprocess-detail.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { of } from 'rxjs/observable/of';
import { catchError, finalize, map, switchMap, tap, min } from 'rxjs/operators';
import * as loadingActions from '../../../main/actions/loading.actions';
import * as fromMain from '../../../main/main.reducers.index';
import {
    GetProcessDetailData,
    GetProcessDetailDataSuccess,
    ProcessDetailActionTypes,
    ProcessDetailFailure,
    GetProcessDetailDataSelectBoxes,
    GetProcessDetailDataSelectBoxesSuccess
} from '../actions/process-detail.actions';
import {
    ProcessDetailDataModelUI,
    ProcessDetailTableModelUI,
    ProcessDetailTableInformationModelUI,
    ProcessDetailChartModelUI,
    ProcessDetailValuesChartModelUI
} from '../models/process-detail.models';
import { Observable } from 'rxjs';

@Injectable()
export class ProcessDetailEffects {

    @Effect()
    public getProcessDetailData$ = this.actions$.pipe(
        ofType<GetProcessDetailData>(ProcessDetailActionTypes.GetProcessDetailData),
        tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
        map((action) => {
            return action.payload;
        }),
        switchMap((payload) =>

            Observable.of(
                [
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
                ]
            )
            // TODO: When backend is finished, uncomment service and the load tests
            // this.processDetailService.GetProcessDetailData(payload)
            .pipe(
                map((response: any[]) => {

                    const oeeData: ProcessDetailDataModelUI = {
                        Chart: convertApiDataToProcessDetailChartModelUI(response),
                        Table: convertApiDataToProcessDetailTableModelUI(response)
                    };

                    return new GetProcessDetailDataSuccess(oeeData);
                }),
                finalize(() => this.mainStore$.dispatch(new loadingActions.HideLoading())),
                catchError((error) => {
                    return of(new ProcessDetailFailure(error));
                })
            )
        )
    );

    @Effect({ dispatch: false })
    public getProcessDetailDataSuccess$ = this.actions$.pipe(
        ofType<GetProcessDetailDataSuccess>(ProcessDetailActionTypes.GetProcessDetailDataSuccess)
    );

    @Effect()
    public getProcessDetailDataSelectBox$ = this.actions$.pipe(
        ofType<GetProcessDetailDataSelectBoxes>(ProcessDetailActionTypes.GetProcessDetailDataSelectBoxes),
        tap(() => this.mainStore$.dispatch(new loadingActions.ShowLoading())),
        switchMap(() =>
            this.machineService.GetMachines()
            .pipe(
                map((response: any[]) => {
                    return new GetProcessDetailDataSelectBoxesSuccess(convertApiDataToSelectBox(response));
                }),
                finalize(() => this.mainStore$.dispatch(new loadingActions.HideLoading())),
                catchError((error) => {
                    return of(new ProcessDetailFailure(error));
                })
            )
        )
    );

    @Effect({ dispatch: false })
    public getProcessDetailDataSelectBoxSuccess$ = this.actions$.pipe(
        ofType<GetProcessDetailDataSelectBoxesSuccess>(ProcessDetailActionTypes.GetProcessDetailDataSelectBoxesSuccess)
    );

    @Effect({ dispatch: false })
        public processDetailFailure$ = this.actions$.pipe(
        ofType<ProcessDetailFailure>(ProcessDetailActionTypes.ProcessDetailFailure),
        tap((error) => {
            console.log('error');
        })
    );

    public constructor(
        private processDetailService: IProcessDetailMachiningService,
        private machineService: IMachineService,
        private actions$: Actions,
        private mainStore$: Store<fromMain.MainState>
    ) {}
}

/**
 * Manipulate api data to be readable by table
 * @param data data from api to be manipulated
 * @returns data formated soo the data can be read by table
 */
export function convertApiDataToProcessDetailTableModelUI(
    data: any
): ProcessDetailTableInformationModelUI {
    const tableData: ProcessDetailTableModelUI[] = [];

    data.forEach((elem) => {
        tableData.push({
            Id: null,
            MachineState: elem.MachineState,
            Reason: elem.Reason,
            Duration: elem.Duration,
            StartTime: elem.StartTime,
            EndTime: elem.EndTime,
        });
    });

    return {
        Information: tableData,
        Total: tableData.length
    };
}

export function convertApiDataToSelectBox(data: any[]): MimsSelectBoxModel[] {
    const element: MimsSelectBoxModel[] = [];

    data.forEach((elem) => {
        element.push({
            name: elem.Name,
            value: elem.Id,
            selected: false
        });
    });

    return element;
}

/**
 * Manipulate api data to be readable by chart
 * @param data data from api to be manipulated
 * @returns data formated soo the data can be read by chart
 */
export function convertApiDataToProcessDetailChartModelUI(data: any[]): ProcessDetailChartModelUI[] {

    const series: ProcessDetailValuesChartModelUI[] = [];

    data.forEach((elem) => {
        series.push({
            name: new Date(elem.EndTime).toISOString(),
            value: elem.Duration,
            extra: {
                startTime : elem.StartTime,
                endTime : elem.EndTime,
                machineState: elem.MachineState
            }
        });
    });

    return [{
        name: '',
        series
    }];
}
